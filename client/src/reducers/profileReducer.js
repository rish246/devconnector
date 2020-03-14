import { GET_PROFILE, PROFILE_ERROR, GET_PROFILES, GET_REPOS } from '../actions/types';

const INITIAL_STATE = {
	profiles: [],
	profile: {},
	error: {},
	loading: true,
	repos: []
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_PROFILES:
			return { ...state, profiles: action.payload, loading: false, error: {} };
		case GET_PROFILE:
			return { ...state, profile: action.payload, loading: false };
		case GET_REPOS:
			return { ...state, repos: action.payload, loading: false };

		case PROFILE_ERROR:
			return { ...state, profile: null, error: action.payload, loading: false };
		default:
			return state;
	}
};

export default profileReducer;

// we did this

// create Profile => same actions were being performed
