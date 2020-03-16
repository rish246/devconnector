import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';
import { fetchMyProfile } from '../../actions/profiles';
import Spinner from '../layouts/Spinner';
class EditProfile extends Component {
	componentDidMount() {
		//get the initial profile
		this.props.fetchMyProfile();
	}
	render() {
		if (!this.props.profile) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}

		return <ProfileForm edit={true} initialValues={this.props.profile} />;
	}
}

// my profile is not getting fetched when i am directly

const mapStateToProps = (state) => {
	const { profile } = state.profile;
	return { profile };
};

export default connect(mapStateToProps, { fetchMyProfile })(EditProfile);
