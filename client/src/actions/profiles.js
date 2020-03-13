// this will include all the fetchRequests from profile
import axios from 'axios';

import server from '../apis/server';
import { PROFILE_ERROR, GET_PROFILE, UPDATE_LIKES } from './types';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';
import { setAlert } from './alerts';
export const fetchMyProfile = () => async (dispatch) => {
	// we are not sending the token

	console.log(localStorage.token);
	if (localStorage.token) {
		server.defaults.headers.common['x-auth-token'] = localStorage.token;
	}

	try {
		const response = await server.get('/profiles/me');

		//no profile
		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});
		// if profile found => profile data is sent in the state
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { status: err.response.status, msg: err.response.statusText }
		});
	}
};

// even if i am sending the x-auth-token we are still getting unauthorized

// if (!response.)

// profile => me => response.status => if response.status => 404 => createProfile => profileInfo

export const createProfile = (formValues, edit = false) => async (dispatch) => {
	// load user =>
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	setAuthToken(localStorage.token);

	// basically i am not sending any data to th ea
	try {
		const response = await server.post('/profiles', formValues, config);

		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// i have to tell that if the request is meant to edit the profile or to create a new one
