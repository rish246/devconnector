import React, { Component, Fragment } from 'react';
import { Field, reduxForm, Form } from 'redux-form';

import { createPost } from '../../slices/posts';
import { connect } from 'react-redux';

class PostCreate extends Component {
	renderTextArea = ({ input, name, cols, rows, placeholder }) => {
		return (
			<Fragment>
				<textarea name={name} cols={cols} rows={rows} placeholder={placeholder} {...input} />
			</Fragment>
		);
	};

	onSubmit = (formValues) => {
		this.props.createPost(formValues);
	};
	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="post-form">
				<div className="bg-primary p">
					<h3>Say Something...</h3>
				</div>

				<form className="form my-1" onSubmit={handleSubmit(this.onSubmit)}>
					<Field name="text" cols="30" rows="5" placeholder="Create a post" component={this.renderTextArea} />
					<input type="submit" className="btn btn-dark my-1" value="Submit" />
				</form>
			</div>
		);
	}
}

const wrappedForm = reduxForm({
	form: 'addPostForm'
})(PostCreate);

export default connect(null, { createPost })(wrappedForm);

// form => reduxForm => field => reduxForm => formValues => this.(formValues) => setAut

// fetchUser => if(authenticated) => then show the form
