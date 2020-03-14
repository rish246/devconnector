import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import { createProfile, fetchMyProfile } from '../../actions/profiles';
import Spinner from '../layouts/Spinner';
class EditProfile extends Component {
	componentDidMount() {
		//get the initial profile
		this.props.fetchMyProfile();
	}
	render() {
		if (Object.keys(this.props.profile).length === 0) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}

		return <ProfileForm onSubmit={this.props.createProfile} edit={true} initialValues={this.props.profile} />;
	}
}

// my profile is not getting fetched when i am directly
const mapStateToProps = (state) => {
	console.log(state);
	const { profile } = state.profile;
	return { profile };
};
export default connect(mapStateToProps, { createProfile, fetchMyProfile })(EditProfile);

// user set kar dega

// refactor => profileForm => if(edit) => profileForm => values => else simple profile Form
