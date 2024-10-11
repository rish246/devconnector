import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getProfileById, getGitRepos } from '../../actions/profiles';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

//when this component renders => we want to get the profile
class ShowProfile extends Component {
	componentDidMount() {
		// get profile by id
		// console.log(this.props)
		console.log('Mounted Component')
		this.props.getProfileById(this.props.match.params.id);
		// make another action creator to get the github profiles of the user
	}

	renderSkills(skills) {
		return skills.map((skill) => {
			return (
				<div class="p-1">
					<i class="fa fa-check" /> {skill}
				</div>
			);
		});
	}

	renderExperience(experience) {
		return experience.map(({ company, from, to, description, position }) => {
			return (
				<div>
					<h3 class="text-dark">{company}</h3>
					<p>
						{from} - {to || 'Current'}
					</p>
					<p>
						<strong>Position: </strong>
						{position}
					</p>
					<p>
						<strong>Description: </strong>
						{description}
					</p>
				</div>
			);
		});
	}

	renderEducation(education) {
		return education.map(({ school, from, to, degree, fieldOfStudy, description }) => {
			return (
				<div>
					<h3>{school}</h3>
					<p>
						{from} - {to || 'current'}
					</p>
					<p>
						<strong>Degree: </strong>
						{degree}
					</p>
					<p>
						<strong>Field Of Study: </strong>
						{fieldOfStudy}
					</p>
					<p>
						<strong>Description: </strong>
						{description}
					</p>
				</div>
			);
		});
	}

	// getGitRepos(username) {
	// 	this.props.getGitRepos(username);
	// }

	// renderGitRepos(username) {
	// 	this.getGitRepos(username); // make changes to redux store and now we will have

	// 	if (!this.props.repos.length) return null;

	// 	return this.props.repos.map(({ name, stargazers_count, watchers_count, forks_count }, idx) => {
	// 		return (
	// 			<div class="repo bg-white p-1 my-1">
	// 				<div>
	// 					<h4>
	// 						<a href="#" target="_blank" rel="noopener noreferrer">
	// 							Repo {idx + 1}
	// 						</a>
	// 					</h4>
	// 					<p>{name}</p>
	// 				</div>
	// 				<div>
	// 					<ul>
	// 						<li class="badge badge-primary">Stars: {stargazers_count}</li>
	// 						<li class="badge badge-dark">Watchers: {watchers_count}</li>
	// 						<li class="badge badge-light">Forks: {forks_count}</li>
	// 					</ul>
	// 				</div>
	// 			</div>
	// 		);
	// 	});
	// }

	renderSocials(socials) {}
	renderProfile() {
		console.log(this.profile)
		if (!Object.keys(this.props.profile).length) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}

		const {
			skills,
			_id,
			user,
			status,
			experience,
			education,
			date,
			bio,
			company,
			githubusername,
			location,
			website
		} = this.props.profile;

		console.log(user);
		if (!user) return null;

		return (
			<section class="container" key={_id}>
				<Link to="/profiles" class="btn btn-light">
					Back To Profiles
				</Link>

				<div class="profile-grid my-1">
					<div class="profile-top bg-primary p-2">
						<img class="round-img my-1" src={user.avatar} alt="" />
						<h1 class="large">{user.name}</h1>
						<p class="lead">
							{status} at {company}
						</p>
						<p>{location}</p>
						<div class="icons my-1">
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fas fa-globe fa-2x" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fab fa-twitter fa-2x" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fab fa-facebook fa-2x" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fab fa-linkedin fa-2x" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fab fa-youtube fa-2x" />
							</a>
							<a href="#" target="_blank" rel="noopener noreferrer">
								<i class="fab fa-instagram fa-2x" />
							</a>
						</div>
					</div>

					<div class="profile-about bg-light p-2">
						<h2 class="text-primary">{user.name}'s bio</h2>
						<p>{bio}</p>
						<div class="line" />
						<h2 class="text-primary">Skill Set</h2>
						<div class="skills">{this.renderSkills(skills)}</div>
					</div>

					<div class="profile-exp bg-white p-2">
						<h2 class="text-primary">Experience</h2>
						{this.renderExperience(experience)}
					</div>

					<div class="profile-edu bg-white p-2">
						<h2 class="text-primary">Education</h2>
						{this.renderEducation(education)}
					</div>

					<div class="profile-github">
						<h2 class="text-primary my-1">
							<i class="fab fa-github" /> Github Repos
						</h2>

						{/* {this.renderGitRepos(githubusername)} */}
					</div>
				</div>
			</section>
		);
	} //use this.props.profile

	render() {
		if (!this.props.profile) {
			return <Spinner />
		}
		return <div>{this.renderProfile()}</div>;
	}
}

const mapStateToProps = (state) => {
	const { profile, repos } = state.profile;
	console.log({ profile });
	return { profile, repos };
};

export default connect(mapStateToProps, { getProfileById })(ShowProfile);
// specific dev's profile

// now this id
