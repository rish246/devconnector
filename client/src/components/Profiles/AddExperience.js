import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addExperience } from '../../actions/profiles';
class AddExperience extends Component {
	renderInput({ input, type, placeholder, name }) {
		return (
			<Fragment>
				<input {...input} type={type} placeholder={placeholder} name={name} />
			</Fragment>
		);
	}

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
		this.props.addExperience(formValues);
	};
	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				{' '}
				<section class="container">
					<h1 class="large text-primary">Add An Experience</h1>
					<p class="lead">
						<i class="fas fa-code-branch" /> Add any developer/programming positions that you have had in
						the past
					</p>
					<small>* = required field</small>
					<form class="form" onSubmit={handleSubmit(this.onSubmit)}>
						<div class="form-group">
							<Field
								type="text"
								placeholder="* Job Title"
								name="title"
								required
								component={this.renderInput}
							/>
						</div>
						<div class="form-group">
							<Field
								type="text"
								placeholder="* Company"
								name="company"
								required
								component={this.renderInput}
							/>
						</div>
						<div class="form-group">
							<Field type="text" placeholder="Location" name="location" component={this.renderInput} />
						</div>
						<div class="form-group">
							<h4>From Date</h4>
							<Field type="date" name="from" component={this.renderInput} />
						</div>
						<div class="form-group">
							<p>
								<Field type="checkbox" name="current" value="" component={this.renderInput} /> Current
								Job
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

//sunday => add validation to all the forms => handle all the edge cases

const wrappedForm = reduxForm({
	form: 'addExperienceForm'
})(AddExperience);
export default connect(null, { addExperience })(wrappedForm);
// add exp component table
// add edu
// update profile => refactor

// tomorrow start working on getting profiles => displaying profiles altogether

// reduxForm
