import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PostCreate from './PostCreate';
import PostList from './PostList';
import { loadUser } from '../../slices/auth';
import Spinner from '../layouts/Spinner';

class Posts extends Component {
	componentDidMount() {
		this.props.loadUser();
	}
	render() {
		if (this.props.loading) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}
		return (
			<div>
				<PostCreate />
				<PostList />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { loading } = state.post;
	return { loading };
};
export default connect(null, { loadUser })(Posts);

// authenticate the user
