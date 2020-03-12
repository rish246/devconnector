import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadUser } from '../../actions';

class Dashboard extends Component {
	componentDidMount() {
		this.props.loadUser();
	}
	render() {
		return <div>Dashboard</div>;
	}
}

export default connect(null, { loadUser })(Dashboard);

// after this change the actions path all over the project
