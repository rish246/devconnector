// sign up form
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

// get the action creator
import { signUpUser } from '../../actions/auth';
import renderAlert from '../../utils/renderAlert';
class Signup extends Component {
	//make a component to render the input

	renderError = ({ error, touched }) => {
		if (touched && error) {
			return <div className="alert-danger ">{error}</div>;
		}

		return null;
	};

	renderInput = ({ input, type, name, placeholder, minLength, meta }) => {
		// it returns the input
		console.log(meta);
		return (
			<div className="form-group">
				<input type={type} placeholder={placeholder} name={name} minLength={minLength} {...input} />
				{this.renderError(meta)}
			</div>
		);
	};
	// my onChange func is not working
	// value is already getting set to null so when i am changing the value

	onSubmit = (formValues) => {
		// i have the formValues now i can make the use of an action creator to register the user to our server
		console.log(formValues);
		this.props.signUpUser(formValues);
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<section className="container">
					<h1 className="large text-primary">Sign Up</h1>
					<p className="lead">
						<i className="fas fa-user" /> Create Your Account
					</p>

					{renderAlert(this.props.alert)}
					<form className="form" onSubmit={handleSubmit(this.onSubmit)}>
						<Field type="text" placeholder="Name" name="name" component={this.renderInput} />

						<Field type="email" placeholder="Email Address" name="email" component={this.renderInput} />

						<Field
							type="password"
							placeholder="Password"
							name="password"
							minLength="6"
							component={this.renderInput}
						/>

						<Field
							type="password"
							placeholder="Confirm Password"
							name="password2"
							minLength="6"
							component={this.renderInput}
						/>
						<input type="submit" className="btn btn-primary" value="Register" />
					</form>
					<p className="my-1">
						Already have an account? <Link to="/login">Log In</Link>
					</p>
				</section>
			</div>
		);
	}
}
// i will use validation inside the redux form

const validate = (values) => {
	const errors = {};
	console.log(values.password2);

	const errorMessage = 'This field is required';
	if (!values.name) {
		errors.name = errorMessage;
	}
	if (!values.email) {
		errors.email = errorMessage;
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.password) {
		errors.password = errorMessage;
	}

	if (!values.password2) {
		errors.password2 = errorMessage;
	}

	if (values.password !== values.password2) {
		errors.password2 = 'Passwords must match';
	}

	return errors;
};

const mapStateToProps = (state) => {
	const { alert } = state;
	return { alert };
};

const wrappedForm = reduxForm({
	form: 'signUpForm',
	validate
})(Signup);

export default connect(mapStateToProps, { signUpUser })(wrappedForm);

// this was a nice strat to store the alerts in the reducer and to fetch them afterwards

// tomorrow => we will start working on the posts action creator, reducer and posts components
