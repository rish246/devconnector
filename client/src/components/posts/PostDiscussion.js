//this is the last
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getPosts, addComment } from '../../actions/posts';
import Spinner from '../layouts/Spinner';

class PostDiscussion extends Component {
	componentDidMount() {
		console.log(this.props.match.params.postId);
		this.props.getPosts();
	}

	renderTextArea = ({ input, name, cols, rows, placeholder }) => {
		return <textarea name={name} cols={cols} rows={rows} placeholder={placeholder} {...input} />;
	};

	onSubmit = (formValues) => {
		console.log(formValues);
		this.props.addComment(this.props.match.params.postId, formValues);
	};

	renderPost = () => {
		const { post, handleSubmit } = this.props;

		return (
			<section className="container">
				<Link to="/posts" className="btn">
					Back To Posts
				</Link>
				<div className="post bg-white p-1 my-1">
					<div>
						<Link to="profile.html">
							<img className="round-img" src={post.avatar} alt="" />
							<h4>{post.user.name}</h4>
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
						{/* <textarea name="text" cols="30" rows="5" placeholder="Comment on this post" required /> */}
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

	renderComments = () => {
		const { comments } = this.props.post;

		return comments.map((comment) => {
			return (
				<div className="post bg-white p-1 my-1">
					<div>
						<Link to="profile.html">
							<img class="round-img" src={comment.avatar} alt="" />
							<h4>{comment.name}</h4>
						</Link>
					</div>
					<div>
						<p class="my-1">{comment.text}</p>
						<p class="post-date">Posted on {comment.date}</p>
					</div>
				</div>
			);
		});
	};

	render() {
		const { post } = this.props;
		if (!post) {
			return (
				<Fragment>
					<Spinner />
				</Fragment>
			);
		}

		return (
			<div>
				{this.renderPost()}
				{this.renderComments()}
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const { posts } = state.post;
	const post = posts.find((post) => post._id.toString() === ownProps.match.params.postId);
	console.log(post);

	return { post };
};

const wrappedForm = reduxForm({
	form: 'commentForm'
})(PostDiscussion);
export default connect(mapStateToProps, { getPosts, addComment })(wrappedForm);

//this is the last page that i am going to make for this project
// start learning node.js and mongoDB
// start working on adding a property to add other users in this project

// i have to fetch the post every time the component is getting rendered or refreshed
// call in the second function
// make the function work else this project will not work in any case
