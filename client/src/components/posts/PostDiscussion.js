import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getPosts, addComment, getPost } from '../../slices/posts';
import Spinner from '../layouts/Spinner';

class PostDiscussion extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.postId);
	}

	renderTextArea = ({ input, name, cols, rows, placeholder }) => {
		return <textarea name={name} cols={cols} rows={rows} placeholder={placeholder} {...input} />;
	};

	onSubmit = (formValues) => {
		this.props.addComment({ postId: this.props.match.params.postId, formValues });
	};

	renderPost = () => {
		const { post, handleSubmit } = this.props;
		console.log({ post });

		return (
			<section className="container">
				<div className="post bg-white p-1 my-1">
					<div>
						<Link to="profile.html">
							<h4>{post.name}</h4>
						</Link>
					</div>
					<div>
						<p className="my-1">{post.text}</p>
					</div>
				</div>

				<div className="post-form">
					<div className="bg-primary p">
						<h3>Leave A Comment</h3>
					</div>
					<form className="form my-1" onSubmit={handleSubmit(this.onSubmit)}>
						<Field
							name="text"
							cols="30"
							rows="5"
							placeholder="Comment on this post"
							component={this.renderTextArea}
						/>
						<input type="submit" className="btn btn-dark my-1" value="Submit" />
					</form>
				</div>
			</section>
		);
	};

	renderComments(comments) {
		return comments.map((comment) => {
			return (
				<div className="post bg-white p-1 my-1" key={comment._id}>
					<div>
						<Link to="profile.html">
							<img className="round-img" src={comment.avatar} alt="" />
							<h4>{comment.name}</h4>
						</Link>
					</div>
					<div>
						<p className="my-1">{comment.text}</p>
						<p className="post-date">Posted on {comment.date}</p>
					</div>
				</div>
			);
		});
	};

	render() {
		const { post } = this.props;
		if (!post) {
			return <Spinner />;
		}

		console.log({ post: JSON.stringify(post) });

		return (
			<div>
				{this.renderPost()}
				{/* Check if comments exist before rendering */}
				{post.comments && post.comments.length > 0 ? (
					this.renderComments(post.comments)
				) : (
					<p>No comments yet.</p>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const post = state.post.post // Adjust this based on how your state is structured
	return { post };
};

const wrappedForm = reduxForm({
	form: 'commentForm'
})(PostDiscussion);

export default connect(mapStateToProps, { addComment, getPost })(wrappedForm);
