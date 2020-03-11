const express = require('express');
const config = require('config');
const request = require('request');
const { validationResult } = require('express-validator');

const auth = require('../helpers/middlewares/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const {
	requireStatus,
	requireSkills,
	requireCompany,
	requireTitle,
	requireFrom,
	requireSchool,
	requireDegree,
	requireFieldOfStudy
} = require('../helpers/validators');

const router = express.Router();

// @router      GET apis/profiles/me
// @desc        get users profile
// @access      AUTHORISED
router.get('/me', auth, async (req, res) => {
	// auth is added since the route is protected so we have to check the route
	try {
		// profile model = { user: userId}
		const profile = await Profile.findOne({ user: req.user.id }); // we fixed the bug but now it saying what since we dont have a profile that means we cannot find p

		if (!profile) {
			//send a status of unauthorised access
			return res.status(401).json({ msg: 'No profile, unauthorized access' });
		}
		// if profile exists then only populate the profile and not without that

		res.json(profile.populate('user', [ 'name', 'avatar' ]));
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      POST apis/profiles
// @desc        update or create users profile
// @access      AUTHORISED
router.post('/', [
	auth,
	[ requireSkills, requireStatus ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: [ errors.array() ] }); // these are the errors from the check
		}

		// profile will have all these fields
		const {
			company,
			location,
			website,
			bio,
			skills,
			status,
			githubusername,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook
		} = req.body;

		// auth middleware set the value of auth.user = { id: userId }

		// check if the socials are defined or not
		// make socials obj
		// make entries
		// check if object.entries => no entry
		// check if we have value for the entry

		const profileFields = {
			user: req.user.id,
			company,
			website,
			location,
			bio,
			status,
			githubusername,

			//skills = html, css, js => split => ['html', ' css', ' js'] => map and trim => ['html', 'css', 'js']
			skills: skills.split(',').map((skill) => skill.trim())
		};
		const socials = { twitter, youtube, instagram, facebook, linkedin };
		profileFields.socials = socials;

		// we took data from form => added the data to the profileFields => make changes to the database
		try {
			//find a profile
			let profile = await Profile.findOne({ user: req.user.id });

			// if profile exist => update a profile
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					// id of the profile
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			} else {
				profile = new Profile(profileFields);
			}

			console.log(profile);
			await profile.save();

			// else update the profile
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
]);

// @router      GET apis/profiles/all
// @desc        get all profiles
// @access      PUBLIC => no auth middleware
router.get('/all', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		console.log(profiles);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      GET apis/profiles/user/:user_id
// @desc        get profile of a specific user
// @access      PUBLIC => no auth middleware
router.get('/user/:userId', async (req, res) => {
	try {
		const profile = await Profile.findById(req.params.userId).populate('user', [ 'name', 'avatar' ]);

		if (!profile) {
			return res.status(404).send('Profile not found for this user');
		}
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      DELETE apis/profiles/
// @desc        delete profile of current signed in user
// @access      PUBLIC => no auth middleware
router.delete('/', auth, async (req, res) => {
	try {
		//@todo => delete all the posts from the user
		//delete the profile, user and posts of the users
		await Profile.findOneAndRemove({ user: req.user.id });

		// delete the user from user collection
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      DELETE apis/profiles/experience
// @desc        add an experience to the experiences
// @access      PRIVATE
router.put('/experience', [ auth, [ requireCompany, requireTitle, requireFrom ] ], async (req, res) => {
	// in this function we are going to take the form values and put it inside the profile experience collection
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	//if no errors
	const { title, company, from, to, location, current, description } = req.body;

	// create a new object related to the req.body
	const newExperience = {
		title,
		company,
		from,
		to,
		location,
		current,
		description
	};

	// try adding the data to mongodb
	try {
		//add the data to Profile.experience array
		let profile = await Profile.findOne({ user: req.user.id });
		if (!profile) {
			return res.status(400).send('No profile, first create a profile');
		}

		// if there is a profile => add the newExperience to the profile.experience
		profile.experience.unshift(newExperience);
		// make the changes to mongodb
		await profile.save();

		//return the profile
		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}

	// validation is being applied in this case // take the experience and put it inside the profile.experience as an object { }
});

// @router      DELETE apis/profiles/experience/delete/:experienceId
// @desc        delete an experience
// @access      PRIVATE
router.delete('/experience/:experienceId', auth, async (req, res) => {
	try {
		// to delete an exp =>
		// find the profile of the user => <req className="user id"></req>
		// res.json(profile)

		let profile = await Profile.findOne({ user: req.user.id });

		// profile.experience.filter( exp => exp.id === experienceId) => filter out the required experience
		profile.experience = profile.experience.filter((exp) => exp._id != req.params.experienceId);

		// save the profile
		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      DELETE apis/profiles/education
// @desc        add an education
// @access      PRIVATE
router.put(
	'/education',
	[ auth, [ requireSchool, requireDegree, requireFrom, requireFieldOfStudy ] ],
	async (req, res) => {
		// in this function we are going to take the form values and put it inside the profile experience collection
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//if no errors
		const { school, degree, fieldofstudy, from, to, current, description } = req.body;

		// create a new object related to the req.body
		const newEducation = {
			school,
			degree,
			from,
			to,
			fieldofstudy,
			current,
			description
		};

		// try adding the data to mongodb
		try {
			//add the data to Profile.experience array
			let profile = await Profile.findOne({ user: req.user.id });
			if (!profile) {
				return res.status(400).send('No profile, first create a profile');
			}

			// if there is a profile => add the newExperience to the profile.experience
			profile.education.unshift(newEducation);
			// make the changes to mongodb
			await profile.save();

			//return the profile
			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}

		// validation is being applied in this case // take the experience and put it inside the profile.experience as an object { }
	}
);

// @router      DELETE apis/profiles/education/:educationId
// @desc        delete an education
// @access      PRIVATE
router.delete('/education/:educationId', auth, async (req, res) => {
	try {
		// to delete an exp =>
		// find the profile of the user => <req className="user id"></req>
		// res.json(profile)

		let profile = await Profile.findOne({ user: req.user.id });

		// profile.experience.filter( exp => exp.id === experienceId) => filter out the required experience
		profile.education = profile.education.filter((education) => education._id != req.params.educationId);

		// save the profile
		await profile.save();

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// we want to get the repos based on the username => get /github/:username => return reps

// @router      GET apis/profiles/github/:username
// @desc        get github profiles
// @access      PUBLIC
router.get('/github/:username', async (req, res) => {
	// make req to gihub api
	try {
		// try making a request to the github api
		const options = {
			uri: encodeURI(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`),
			method: 'GET',
			headers: {
				'user-agent': 'node.js',
				Authorization: `token ${config.get('githubToken')}`
			}
		};

		request(options, (error, response, body) => {
			if (error) console.error(error);

			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' });
			}

			res.json(JSON.parse(body));
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;

// basically in backend => take the obj and register it into database and make some changes to the data acc to the need of the user

// last thing to work on the profile route => take the github repos of the person
