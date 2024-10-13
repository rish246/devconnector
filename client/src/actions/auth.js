import axios from 'axios';

import history from '../history';
import server from '../apis/server';

import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	CLEAR_PROFILE
} from './types';
import { setAlert } from './alerts';
// make user registration action =>
// we are making use of redux thunk
export const signUpUser = ({ name, email, password }) => async (dispatch) => {
	// make a check that whether password != password2
	const config = {
		header: {
			'Content-Type': 'application/json'
		}
	};
	const body = { name, email, password };

	//sending a response should be a tryCatch block
	try {
		const response = await server.post('/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data
		});

		localStorage.token = response.data.token;
	} catch (err) {
		const errors = err.response.data.errors;
		// for each error we set an alert with a timeout of 5 seconds and type =  'danger'
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};


export const signInUser = ({ email, password }) => async (dispatch) => {
	const config = {
		header: {
			'Content-type': 'application/json'
		}
	};

	const body = { email, password };

	//make the req to the server
	try {
		const response = await server.post('/auth', body, config);

		console.log(response.data);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data
		});

		localStorage.token = response.data.token;
		//dispatch the load user function after the login period
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		// for each error we set an alert with a timeout of 5 seconds and type =  'danger'
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
			payload: err.response.data.errors
		});
	}
};

// i have to store it in the local storage that's it

// i have not made any reducer and not used any auth token
// focus on getting the token and saying that the user is logged in or not
// complete the other action creators related to auth => load user and signOut the user

// now i have to make an action to load the user once every component loads up
export const loadUser = () => async (dispatch) => {
	// we are not sending the token
	if (localStorage.token) {
		server.defaults.headers.common['x-auth-token'] = localStorage.token;
	}

	try {
		const response = await server.get('/auth');

		// in response, i got the user creds => user the id to set the user
		dispatch({
			type: USER_LOADED,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// last job is to signOut user
export const SignOutUser = () => async (dispatch) => {
	// localStorage.token => undefined
	localStorage.token = undefined;

	dispatch({ type: LOGOUT });
	dispatch({ type: CLEAR_PROFILE });

	// clear profile
	// clear the user

	history.push('/');
};

// why clear profile => we dont know

// onSubmit => check the value of error in the state

// onSubmit => profile.error field have the error message
