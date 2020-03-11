const jwt = require('jsonwebtoken');
const config = require('config');

//middleware is a function which takes req, res, next functions
module.exports = (req, res, next) => {
	// req.headers has the token under the field 'x-auth-token'
	const token = req.header('x-auth-token');
	console.log(token); // we are not getting token here
	// check if we recieved a token... if no token => invalid authorisation => res.status(401)
	if (!token) {
		return res.status(401).json({ msg: 'No token, unauthorized access' });
	}

	// we got the token => now assign a value in req.user == payload value of the payload.user === user.id
	try {
		jwt.verify(token, config.get('jwSecret'), (error, decoded) => {
			if (error) {
				res.status(401).json({ msg: 'Token is not valid' });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		return res.send(err.message);
	}
};

// we are getting token as undefined
//after any middleware, we are going to use the next() function callback

// using x-auth-token is not working
