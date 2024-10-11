const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwToken = require('jsonwebtoken');
const config = require('config');

const auth = require('../helpers/middlewares/auth');
const User = require('../../models/Users');
const { requireEmail, validatePassword } = require('../helpers/validators');
const router = express.Router();

// @router      GET apis/users
// @desc        authenticate user & login
// @access      PUBLIC
router.get('/', auth, async (req, res) => {
	// find user by id
	// donot include the password in the result
	try {
		const user = await User.findById(req.user.id).select('-password'); // we will find the user
		res.json(user); // res.json => ok req(200) and the data is shown on the screen

		// sign in the user directly
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// convert into a middleware of checkErrorss
router.post('/', [ requireEmail, validatePassword ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// we are entering the try block but are not able to make this call

		// mongodb is not working
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ errors: [ { msg: 'Invalid email or password' } ] });
		}
		// we have the user

		// const isMatch = await bcrypt.compare(password, user.password);
		const isMatch = password === user.password;
		if (!isMatch) {
			return res.status(400).json({ errors: [ { msg: 'Invalid email or password' } ] });
		}
		// time to implement the jason web token in the next video
		console.log(user);

		// once there is a match ... we start a new session by making req.user = payload and using same functionality
		const payload = {
			user: {
				id: user.id
			}
		};

		console.log(payload);
		jwToken.sign(payload, config.get('jwSecret'), { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;

			res.json({ token }); // sends a status of 200 and res.send the token in the database
		});
	} catch (err) {
		console.error(err.message);
		// this line is causing the error
		res.status(500).send('Server error');
	}
});

module.exports = router;

