// this will include all the fetchRequests from profile
import axios from 'axios';

import server from '../apis/server';
import {
	PROFILE_ERROR,
	GET_PROFILE,
	UPDATE_LIKES,
	GET_PROFILES,
	GET_REPOS,
	CLEAR_PROFILE,
	ACCOUNT_DELETED
} from './types';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';

// action creator to getAll profiles => to get the profile
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
			payload: { msg: err.message }
		});
	}
};

// even if i am sending the x-auth-token we are still getting unauthorized

// if (!response.)

// profile => me => response.status => if response.status => 404 => createProfile => profileInfo

export const createProfile = (formValues, edit = false) => async (dispatch) => {
	console.log('creating a new profile');
	// load user =>
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	setAuthToken(localStorage.token);

	// basically i am not sending any data to th ea
	try {
		console.log('inside the try block');

		const response = await server.post('/profiles', formValues, config);
		console.log(response.data);

		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});
		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}

	console.log('dispatched to the reducer');
};

// i have to tell that if the request is meant to edit the profile or to create a new one

//
export const addExperience = (formValues) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	setAuthToken(localStorage.token);

	try {
		const response = await server.put('/profiles/experience', formValues, config);
		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});

		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};

export const addEducation = (formValues) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	};

	setAuthToken(localStorage.token);

	try {
		const response = await server.put('/profiles/education', formValues, config);
		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});

		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};

// now its time to delete experience
export const deleteExperience = (expId) => async (dispatch, getState) => {
	//delete experience
	setAuthToken(localStorage.token);
	// lets say if i have multiple exp => how would i know the id of the exp

	try {
		//anyways i will copy paste my errors from the devconnector file
		const response = await server.delete(`/profiles/experience/${expId}`);

		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});

		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};
// delete education

export const deleteEducation = (eduId) => async (dispatch) => {
	setAuthToken(localStorage.token);

	try {
		//anyways i will copy paste my errors from the devconnector file
		const response = await server.delete(`/profiles/education/${eduId}`);

		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});

		history.push('/dashboard');
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};

// delete profile

export const deleteProfile = () => async (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		try {
			await axios.delete('/api/profiles');

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELETED });
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};

//get all profiles
// public route
export const getAllProfiles = () => async (dispatch) => {
	try {
		const response = await server.get('/profiles/all');
		console.log(response.data);
		dispatch({
			type: GET_PROFILES,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};

//get profile by id

export const getProfileById = (profileId) => async (dispatch) => {
	try {
		const response = await server.get(`/profiles/user/${profileId}`);
		dispatch({
			type: GET_PROFILE,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};

// get Profile => match.params.id

export const getGitRepos = (username) => async (dispatch) => {
	try {
		const response = await server.get(`/profiles/github/${username}`);
		dispatch({
			type: GET_REPOS,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.message }
		});
	}
};
