import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import { createProfile } from '../../actions/profiles';
class CreateProfile extends Component {
	render() {
		return (
			<Fragment>
				<ProfileForm onSubmit={this.props.createProfile} edit={true} />
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const { loading } = state.profile;
	return { loading };
};

export default connect(mapStateToProps, { createProfile })(CreateProfile);

// user set kar dega

// refactor => profileForm => if(edit) => profileForm => values => else simple profile Form

// get the profile and give the profile =>

// createProfile was working before now it is not working whyy....
