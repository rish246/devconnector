// this component will render the navbar on the top of every component
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
class Header extends Component {
	render() {
		return (
			<nav className="navbar bg-dark">
				<h1>
					<Link to="/">
						<i className="fas fa-code" /> DevConnector
					</Link>
				</h1>
				<ul>
					<li>
						<Link to="profiles.html">Developers</Link>
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
}

export default Header;
