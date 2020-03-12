import axios from 'axios';
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;

// if there is no token then there should be no x-auth-token error

// axios.default.headers and oAuth token => set auth token => axios.header

// if i have token => using protected route => add header 'x-auth-token' else delete header x-auth-token
