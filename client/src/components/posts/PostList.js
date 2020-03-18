// in this component we will fetch all the posts and will display them in jsx
// make an action creator => fetchPosts => postReducer => FETCH_POSTS => posts => { }
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts, likePost, unlikePost, deletePost } from '../../actions/posts';
import { getProfileById } from '../../actions/profiles';

class PostList extends Component {
	componentDidMount() {
		//fetchTheVideos
		this.props.getPosts();
	}

	renderDeleteButton = ({ _id, user }) => {
		if (this.props.user._id.toString() === user) {
			return (
				<button type="button" className="btn btn-danger" onClick={() => this.props.deletePost(_id)}>
					<i className="fas fa-times" />
				</button>
			);
		}

		return null;
	};

	renderPosts = () => {
		return this.props.posts.map((post) => {
			return (
				<div className="post bg-white p-1 my-1">
					<div>
						<Link to={`/profiles`}>
							<img className="round-img" src={post.avatar} alt="" />
							<h4>{post.name}</h4>
						</Link>
					</div>
					<div>
						<p className="my-1">{post.text}</p>
						<p className="post-date">Posted on {post.date}</p>
						<button type="button" className="btn btn-light" onClick={() => this.props.likePost(post._id)}>
							<i className="fas fa-thumbs-up" />
							<span>{post.likes.length}</span>
						</button>
						<button type="button" className="btn btn-light" onClick={() => this.props.unlikePost(post._id)}>
							<i className="fas fa-thumbs-down" />
						</button>
						<Link to={`/posts/${post._id}`} className="btn btn-primary">
							Discussion <span className="comment-count">{post.comments.length}</span>
						</Link>
						{/* <button
							type="button"
							className="btn btn-danger"
							onClick={() => this.props.deletePost(post._id)}
						>
							<i className="fas fa-times" />
						</button> */}

						{this.renderDeleteButton(post)}
					</div>
				</div>
			);
		});
	};
	render() {
		console.log(this.props.posts);
		return <div>{this.renderPosts()}</div>;
	}
}

const mapStateToProps = (state) => {
	//get the posts from state
	const { posts } = state.post;
	const { user } = state.auth;
	return { posts, user };
};

export default connect(mapStateToProps, { getPosts, likePost, unlikePost, deletePost })(PostList);
