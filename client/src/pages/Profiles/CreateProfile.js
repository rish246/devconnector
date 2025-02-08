import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
class CreateProfile extends Component {
	render() {
		return (
			<Fragment>
				<ProfileForm />
			</Fragment>
		);
	}
}

export default connect(null)(CreateProfile);

// user set kar dega

// refactor => profileForm => if(edit) => profileForm => values => else simple profile Form

// get the profile and give the profile =>

// createProfile was working before now it is not working whyy....
