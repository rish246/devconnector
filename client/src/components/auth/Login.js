// login form
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import history from '../../history';
import { signInUser } from '../../actions/auth';

class Login extends Component {
	// in the begining -- we have not put anything in the credentials
	renderError() {
		if (!this.props.isAuthenticated) {
			return (
				// return the error message
				<div className="alert alert-danger">Invalid Credentials</div>
			);
		}

		return null;
	}
	renderInput({ input, type, placeholder, name }) {
		//render the input Field
		return (
			<div className="form-group">
				<input type={type} placeholder={placeholder} name={name} {...input} />
			</div>
		);
	}

	onSubmit = (formValues) => {
		console.log(formValues);

		this.props.signInUser(formValues);
		// after signInUser => we are going to send the message invalid credentials
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
				{this.renderError()}
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
					Don't have an account? <a href="register.html">Sign Up</a>
				</p>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth;
	return { isAuthenticated };
};

const wrappedForm = reduxForm({
	form: 'loginForm'
})(Login);

export default connect(mapStateToProps, { signInUser })(wrappedForm);

//now use mapStateToProps => if isAuthenticated => false => show the errors

// we are updating the props => history.push('/')

// we are losing the is
