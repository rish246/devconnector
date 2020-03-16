import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllProfiles } from '../../actions/profiles';
import Spinner from '../layouts/Spinner';
class Profiles extends Component {
	componentDidMount() {
		this.props.getAllProfiles();
	}

	renderSkills(skills) {
		return skills.map((skill) => {
			return (
				<li class="text-primary">
					<i class="fas fa-check" /> {skill}
				</li>
			);
		});
	}

	renderProfiles = () => {
		if (!Object.keys(this.props.profiles).length) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}

		const renderProfiles = this.props.profiles.map(
			({ user, status, bio, company, location, website, _id, skills }) => {
				if (!user) return null;

				console.log(user);
				return (
					<div class="profile bg-light" key={_id}>
						<img class="round-img" src={user.avatar} />
						<div>
							<h2>{user.name || 'User'}</h2>
							<p>
								{status} at {company}
							</p>
							<p>{location}</p>
							<Link to={`/profiles/${_id}`} class="btn btn-primary">
								View Profile
							</Link>
						</div>

						<ul>{this.renderSkills(skills)}</ul>
					</div>
				);
			}
		);

		return renderProfiles;
	};
	render() {
		return <div className="profiles">{this.renderProfiles()}</div>;
	}
}

const mapStateToProps = (state) => {
	const { profiles } = state.profile;
	return { profiles };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
