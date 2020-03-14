import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addEducation } from '../../actions/profiles';
class AddEducation extends Component {
	renderError = ({ touched, error }) => {
		if (touched && error) {
			return <div className="alert-danger ">{error}</div>;
		}

		return null;
	};
	renderInput = ({ input, type, placeholder, name, meta }) => {
		return (
			<Fragment>
				<input {...input} type={type} placeholder={placeholder} name={name} />
				{this.renderError(meta)}
			</Fragment>
		);
	};

	renderTextArea({ name, rows, cols, placeholder, input }) {
		return (
			<Fragment>
				<textarea {...input} name={name} cols={cols} rows={rows} placeholder={placeholder} />
			</Fragment>
		);
	}

	onSubmit = (formValues) => {
		// we can use these values to make a put req to /api/profiles/expreience =>
		console.log(formValues);
		this.props.addEducation(formValues);
	};
	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				{' '}
				<section class="container">
					<h1 class="large text-primary">Add An Education</h1>
					<p class="lead">
						<i class="fas fa-code-branch" /> Add any educational experience
					</p>
					<small>* = required field</small>
					<form class="form" onSubmit={handleSubmit(this.onSubmit)}>
						<div class="form-group">
							<Field
								type="text"
								placeholder="* School or Bootcamp"
								name="school"
								required
								component={this.renderInput}
							/>
						</div>
						<div class="form-group">
							<Field
								type="text"
								placeholder="* Degree or Certificate"
								name="degree"
								required
								component={this.renderInput}
							/>
						</div>
						<div class="form-group">
							<Field
								type="text"
								placeholder="Field Of Study"
								name="fieldofstudy"
								component={this.renderInput}
							/>
						</div>
						<div class="form-group">
							<h4>From Date</h4>
							<Field type="date" name="from" component={this.renderInput} />
						</div>
						<div class="form-group">
							<p>
								<Field type="checkbox" name="current" value="" component={this.renderInput} /> Current
								School/bootcamp
							</p>
						</div>
						<div class="form-group">
							<h4>To Date</h4>
							<Field type="date" name="to" component={this.renderInput} />
						</div>
						<div class="form-group">
							<Field
								name="description"
								cols="30"
								rows="5"
								placeholder="Job Description"
								component={this.renderTextArea}
							/>
						</div>
						<input type="submit" class="btn btn-primary my-1" />
						<Link class="btn btn-light my-1" to="/dashboard">
							Go Back
						</Link>
					</form>
				</section>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	const errorMessage = 'This field is required';

	//school degree fieldOfStudy from
	if (!values.school) {
		errors.school = errorMessage;
	}

	if (!values.degree) {
		errors.degree = errorMessage;
	}

	if (!values.fieldOfStudy) {
		errors.fieldOfStudy = errorMessage;
	}

	if (!values.from) {
		errors.from = errorMessage;
	}

	console.log(errors);
	return errors;
};

//sunday => add validation to all the forms => handle all the edge cases

const wrappedForm = reduxForm({
	form: 'addEducationForm',
	validate
})(AddEducation);
export default connect(null, { addEducation })(wrappedForm);
// add exp component table
// add edu
// update profile => refactor

// tomorrow start working on getting profiles => displaying profiles altogether

// reduxForm
