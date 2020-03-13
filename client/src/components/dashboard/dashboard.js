import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../actions/auth';
import { fetchMyProfile } from '../../actions/profiles';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
	componentDidMount() {
		this.props.loadUser();
		this.props.fetchMyProfile();
	}

	renderComponent() {
		if (this.props.error) {
			return (
				<div>
					<h3>OOPS..!! It looks like you dont have a profile</h3>
					<Link to="/profile/create">Create Profile</Link>
				</div>
			);
		}
	}
	render() {
		return <div>{this.renderComponent()}</div>;
	}
}

const mapStateToProps = (state) => {
	const { profile, error } = state.profile;
	return { profile, error };
};

export default connect(mapStateToProps, { loadUser, fetchMyProfile })(Dashboard);

// create Profile form => register these users
// createProfile, updateProfile
