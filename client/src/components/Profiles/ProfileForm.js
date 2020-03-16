import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createProfile } from '../../actions/profiles';

class ProfileForm extends Component {
	renderError = ({ touched, error }) => {
		if (touched && error) {
			return <div className="alert-danger ">{error}</div>;
		}

		return null;
	};

	renderInput = ({ input, meta, type, placeholder, name }) => {
		return (
			<Fragment>
				<input type={type} placeholder={placeholder} name={name} {...input} />
				{this.renderError(meta)}
			</Fragment>
		);
	};

	renderTextArea = ({ input, name, placeholder, meta }) => {
		return (
			<Fragment>
				<textarea placeholder={placeholder} name={name} {...input} />
				{this.renderError(meta)}
			</Fragment>
		);
	};

	onSubmit = (formValues) => {
		console.log(formValues);
		// we have formValues ... now we can make an action creator to use the form values to make post req to the backend
		this.props.createProfile(formValues, this.props.edit);
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<section className="container">
				<h1 className="large text-primary">Create Your Profile</h1>
				<p className="lead">
					<i className="fas fa-user" /> Let's get some information to make your profile stand out
				</p>
				<small>* = required field</small>
				<form className="form" onSubmit={handleSubmit(this.onSubmit)}>
					<div className="form-group">
						<Field name="status" type="text" placeholder="Status" component={this.renderInput} />
						{/* <Field component={this.renderDropdown} options={options} /> */}

						<small className="form-text">Eg: Junior Dev/ Senior Dev/ Student/ Intern etc</small>
					</div>
					<div className="form-group">
						<Field type="text" placeholder="Company" name="company" component={this.renderInput} />
						<small className="form-text">Could be your own company or one you work for</small>
					</div>
					<div className="form-group">
						<Field type="text" placeholder="Website" name="website" component={this.renderInput} />
						<small className="form-text">Could be your own or a company website</small>
					</div>
					<div className="form-group">
						<Field type="text" placeholder="Location" name="location" component={this.renderInput} />
						<small className="form-text">City & state suggested (eg. Boston, MA)</small>
					</div>
					<div className="form-group">
						<Field type="text" placeholder="* Skills" name="skills" component={this.renderInput} />
						<small className="form-text">
							Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
						</small>
					</div>
					<div className="form-group">
						<Field
							type="text"
							placeholder="Github Username"
							name="githubusername"
							component={this.renderInput}
						/>
						<small className="form-text">
							If you want your latest repos and a Github link, include your username
						</small>
					</div>
					<div className="form-group">
						<Field placeholder="A short bio of yourself" name="bio" component={this.renderTextArea} />
						<small className="form-text">Tell us a little about yourself</small>
					</div>

					<div className="my-2">
						<button type="button" className="btn btn-light">
							Add Social Network Links
						</button>
						<span>Optional</span>
					</div>

					<div className="form-group social-input">
						<i className="fab fa-twitter fa-2x" />
						<Field type="text" placeholder="Twitter URL" name="twitter" component={this.renderInput} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-facebook fa-2x" />
						<Field type="text" placeholder="Facebook URL" name="facebook" component={this.renderInput} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-youtube fa-2x" />
						<Field type="text" placeholder="YouTube URL" name="youtube" component={this.renderInput} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-linkedin fa-2x" />
						<Field type="text" placeholder="Linkedin URL" name="linkedin" component={this.renderInput} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-instagram fa-2x" />
						<Field type="text" placeholder="Instagram URL" name="instagram" component={this.renderInput} />
					</div>
					<input type="submit" className="btn btn-primary my-1" />
					<Link className="btn btn-light my-1" to="/dashboard">
						Go Back
					</Link>
				</form>
			</section>
		);
	}
}

const validate = (values) => {
	const errors = {};

	const errorMessage = 'This field is required';

	if (!values.status) {
		errors.status = errorMessage;
	}
	if (!values.skills) {
		errors.skills = errorMessage;
	}
	console.log(errors);
	return errors;
};

const mapStateToProps = (state) => {
	console.log(state);
	const { profile, loading } = state.profile;
	return { profile, loading };
};

const wrappedForm = reduxForm({
	form: 'createProfileForm',
	validate
})(ProfileForm);

export default connect(mapStateToProps, { createProfile })(wrappedForm);

// rendering alert message is the last messages
