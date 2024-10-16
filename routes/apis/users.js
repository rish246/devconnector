const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwToken = require('jsonwebtoken'); //this library has functions that can make the signIn process a lot easier
const config = require('config');

const User = require('../../models/Users');
const { requireEmail, requireName, requirePassword } = require('../helpers/validators');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post('/', [ requireName, requireEmail, requirePassword ], async (req, res) => {
	const errors = validationResult(req);
	console.log({
		errors
	})
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// we are entering the try block but are not able to make this call

		// mongodb is not working
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
		}

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm'
		});

		user = new User({
			name,
			email,
			avatar,
			password
		});

		// const salt = await bcrypt.genSalt(10);

		// user.password = await bcrypt.hash(password, salt);
		user.password = password;

		// time to implement the jason web token in the next video

		// IN PAYLOAD WE STORE THE DATA THAT WE ARE GOING TO USE TO SIGN IN THE USER... IN THIS CASE, THE USERID
		const payload = {
			user: {
				id: user.id
			}
		};

		await user.save();

		jwToken.sign(payload, config.get('jwSecret'), { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;

			res.json({ token }); // sends a status of 200 and res.send the token in the database
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;

// we can pull this out in a separate helper functions

// now since we have successfully registered in the database the response.data = token
// state => auth => isSignedIn => true
