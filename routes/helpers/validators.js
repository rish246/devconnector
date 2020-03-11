const { check } = require('express-validator');

const validate = {
	//validators related to users.js and auth.js
	requireEmail: check('email').isEmail().withMessage('Please enter a valid email'),
	requireName: check('name').not().isEmpty().withMessage('This field should not be empty'),
	requirePassword: check('password')
		.isLength({ min: 5 })
		.withMessage('Password must be atleast 5 or more characters'),

	//validators related to auth.js
	validatePassword: check('password').exists().withMessage('Password is required'),

	//validators related to profile.js
	requireStatus: check('status').not().isEmpty().withMessage('status field is required'),
	requireSkills: check('skills').not().isEmpty().withMessage('Skills field is required'),

	requireCompany: check('company').not().isEmpty().withMessage('This field is required'),
	requireTitle: check('title').not().isEmpty().withMessage('This field is required'),
	requireFrom: check('from').not().isEmpty().withMessage('from date is required'),

	requireSchool: check('school').not().isEmpty().withMessage('This field is required'),
	requireDegree: check('degree').not().isEmpty().withMessage('This field is required'),
	requireFieldOfStudy: check('fieldofstudy').not().isEmpty().withMessage('This field is required'),

	//validators related to posts route
	requireText: check('text').not().isEmpty().withMessage('This field is required')
};

module.exports = validate;

// add validators to { requireStatus, requireSkills}
