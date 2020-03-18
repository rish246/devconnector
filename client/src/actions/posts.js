import { GET_POSTS, GET_POST, ADD_POST, UPDATE_LIKES, DELETE_POST, ADD_COMMENT } from './types';
import server from '../apis/server';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';

export const getPosts = () => async (dispatch) => {
	// first we have to be validated in order to use this token
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const response = await server.get('/posts');

		console.log(response.data);

		dispatch({
			type: GET_POSTS,
			payload: response.data
		});
	} catch (error) {
		console.log(error);
	}
};

export const getPost = (postId) => async (dispatch) => {
	// first we have to be validated in order to use this token
	console.log(postId);
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const response = await server.get(`/posts/${postId}`);
		console.log(response.data);

		dispatch({
			type: GET_POST,
			payload: response.data
		});
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (formValues) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		const response = await server.post('/posts', formValues, config);

		console.log(response);

		dispatch({
			type: ADD_POST,
			payload: response.data
		});

		dispatch(getPosts());

		//dispatch an event to clear the value of the text area after the post is made that post is completed
	} catch (error) {
		console.log(error);
	}
};

//we get the post]
// by this we will add => post.unshift => action.payload =>

export const likePost = (postId) => async (dispatch) => {
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const response = await server.put(`/posts/like/${postId}`);

		console.log(response.data);
		dispatch({
			type: UPDATE_LIKES,
			payload: response.data
		});

		dispatch(getPosts());
		//after liking the post it will also get the posts again and update the reducer
	} catch (error) {
		console.log(error);
	}
};

export const unlikePost = (postId) => async (dispatch) => {
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const response = await server.put(`/posts/unlike/${postId}`);

		console.log(response.data);
		dispatch({
			type: UPDATE_LIKES,
			payload: response.data
		});

		dispatch(getPosts());
	} catch (error) {
		console.log(error);
	}
};

//make a action creator to delete the post
export const deletePost = (postId) => async (dispatch) => {
	try {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		const response = await server.delete(`/posts/${postId}`);
		console.log(response.data);

		dispatch({
			type: DELETE_POST,
			payload: postId
		});

		dispatch(getPosts());
	} catch (error) {
		console.log(error);
	}
};

export const addComment = (postId, formValues) => async (dispatch) => {
	//add a comment to a postId
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		setAuthToken(localStorage.token);

		const response = await server.put(`/posts/comment/${postId}`, formValues, config);
		console.log(response);

		dispatch({
			type: ADD_COMMENT,
			response: response.data
		});

		dispatch(getPosts());
	} catch (error) {
		console.log(error);
	}
};
