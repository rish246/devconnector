import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../actions/auth';
import { fetchMyProfile, deleteProfile } from '../../actions/profiles';
import { Link } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

class Dashboard extends Component {
	componentDidMount() {
		this.props.loadUser();
		this.props.fetchMyProfile();
	}

	//Loading => spinner
	// Profile Found => profile Info
	renderComponent() {
		if (this.props.loading) {
			return (
				<div>
					<Spinner />
				</div>
			);
		} else if (!this.props.profile) {
			return (
				<div>
					<h3>OOPS..!! It looks like you dont have a profile</h3>
					<Link to="/profile/create">Create Profile</Link>
				</div>
			);
		} else {
			return (
				<Fragment>
					<DashboardActions />
					<Education />
					<Experience />
					<button className="btn btn-danger" onClick={() => this.props.deleteProfile(this.props.profile._id)}>
						Delete Profile
					</button>
				</Fragment>
			);
		}
	}
	render() {
		return <div>{this.renderComponent()}</div>;
	}
}

const mapStateToProps = (state) => {
	const { profile, loading, error } = state.profile;
	return { profile, error, loading };
};

export default connect(mapStateToProps, { loadUser, fetchMyProfile, deleteProfile })(Dashboard);

// create Profile form => register these users
// createProfile, updateProfile
