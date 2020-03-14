// login form
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import history from '../../history';
import { signInUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

class Login extends Component {
	// in the begining -- we have not put anything in the credentials
	renderError = ({ touched, error }) => {
		console.log(this);
		if (touched && error) {
			return <div className="alert-danger ">{error}</div>;
		}

		return null;
	};
	renderInput = ({ input, type, placeholder, name, meta }) => {
		//render the input Field
		console.log(meta);
		return (
			<div className="form-group">
				<input type={type} placeholder={placeholder} name={name} {...input} />
				<p>{this.renderError(meta)}</p>
			</div>
		);
	};

	onSubmit = (formValues) => {
		console.log(formValues);

		this.props.signInUser(formValues);
	};

	render() {
		// fetch the handleSubmit callback

		if (this.props.isAuthenticated) {
			history.push('/dashboard');
		}

		// this is not working ... as we are losing our state when we are on this cop
		const { handleSubmit } = this.props;
		return (
			<section className="container">
				<h1 className="large text-primary">Sign In</h1>
				<p className="lead">
					<i className="fas fa-user" /> Sign into Your Account
				</p>
				<form className="form" onSubmit={handleSubmit(this.onSubmit)}>
					{/* <div className="form-group">
						<input type="password" placeholder="Password" name="password" />
					</div> */}
					<Field type="email" name="email" placeholder="Email" component={this.renderInput} />
					<Field type="password" name="password" placeholder="Password" component={this.renderInput} />
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Don't have an account? <Link href="/signup">Sign Up</Link>
				</p>
			</section>
		);
	}
}

const validate = (values) => {
	const errors = {};

	const errorMessage = 'This field is required';

	if (!values.email) {
		errors.email = errorMessage;
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}
	if (!values.password) {
		errors.password = errorMessage;
	}

	console.log(errors);
	return errors;
};

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth;
	return { isAuthenticated };
};

const wrappedForm = reduxForm({
	form: 'loginForm',
	validate
})(Login);

export default connect(mapStateToProps, { signInUser })(wrappedForm);

//now use mapStateToProps => if isAuthenticated => false => show the errors

// we are updating the props => history.push('/')

// we are losing the is
