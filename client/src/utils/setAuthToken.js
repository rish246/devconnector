import axios from 'axios';
import server from '../apis/server';
const setAuthToken = (token) => {
	if (token) {
		server.defaults.headers.common['x-auth-token'] = token;
	}
};

export default setAuthToken;

// if there is no token then there should be no x-auth-token error

// axios.default.headers and oAuth token => set auth token => axios.header

// if i have token => using protected route => add header 'x-auth-token' else delete header x-auth-token
