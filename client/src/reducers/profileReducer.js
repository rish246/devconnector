import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const INITIAL_STATE = {
	profiles: [],
	profile: {},
	error: {},
	loading: true,
	repos: []
};

const profileReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return { ...state, profile: action.payload, loading: false };

		case PROFILE_ERROR:
			return { ...state, profile: null, error: action.payload, loading: false };
		default:
			return state;
	}
};

export default profileReducer;

// we did this
