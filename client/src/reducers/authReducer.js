import { REGISTER_SUCCESS, LOGIN_SUCCESS, USER_LOADED, LOGOUT, LOGIN_FAIL } from '../actions/types';

//define your initial state for the auth
const INITIAL_STATE = {
	isAuthenticated: null,
	token: localStorage.getItem('token'),
	loading: true,
	user: null,
	error: {}
};

// this is the initial state => isAuthenticated => token => loading ('is the process is loading ', Show the loader if this is true, Maybe )=> user => userId

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return { ...state, ...action.payload, isAuthenticated: true, loading: false };

		case LOGIN_SUCCESS:
			return { ...state, ...action.payload, isAuthenticated: true, loading: false };

		case USER_LOADED:
			return { ...state, user: action.payload, isAuthenticated: true, loading: false }; // we set the user to the userId => use this user id to make various requests
		case LOGOUT:
			return { ...state, user: null, token: undefined, loading: false, isAuthenticated: false };

		case LOGIN_FAIL:
			return {
				...state,
				user: null,
				token: undefined,
				loading: false,
				isAuthenticated: false,
				error: action.payload
			};

		default:
			return state;
	}
};

export default authReducer;

// dispatch => token => localStorage.token => null, token => null

// we did do that ofcourse

// we can use this user._id to make req to get profile and all that shit
