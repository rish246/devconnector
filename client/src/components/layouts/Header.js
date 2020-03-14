// this component will render the navbar on the top of every component
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadUser } from '../../actions/auth';
class Header extends Component {
	componentDidMount() {
		this.props.loadUser();
	}
	renderOption() {
		if (!this.props.isAuthenticated) {
			return (
				<nav className="navbar bg-dark">
					<h1>
						<Link to="/">
							<i className="fas fa-code" /> DevConnector
						</Link>
					</h1>
					<ul>
						<li>
							<Link to="/profiles">Developers</Link>
						</li>
						<li>
							<Link to="/signup">Register</Link>
						</li>
						<li>
							<Link to="/Login">Login</Link>
						</li>
					</ul>
				</nav>
			);
		}

		return (
			<nav class="navbar bg-dark">
				<h1>
					<Link to="/">
						<i class="fas fa-code" /> DevConnector
					</Link>
				</h1>
				<ul>
					<li>
						<Link to="/profiles">Developers</Link>
					</li>
					<li>
						<Link to="/posts">Posts</Link>
					</li>
					<li>
						|
						<Link to="/dashboard" title="Dashboard">
							<i class="fas fa-user" />
							<span class="hide-sm">Dashboard</span>
						</Link>
					</li>
					<li>
						<Link to="/login" title="Logout">
							<i class="fas fa-sign-out-alt" />
							<span class="hide-sm">Logout</span>
						</Link>
					</li>
				</ul>
			</nav>
		);
	}

	render() {
		return <Fragment>{this.renderOption()}</Fragment>;
	}
}

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth;
	return { isAuthenticated };
};

export default connect(mapStateToProps, { loadUser })(Header);

// start working on the header => the header should include

//fetch a user => if(user) => then we will render the auth navbar else
