import { GET_POSTS, GET_POST, ADD_POST, UPDATE_LIKES } from '../actions/types';

// this reducer will
const INITIAL_STATE = {
	posts: [],
	post: {},
	loading: true,
	error: null
};

const postReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_POSTS:
			return { ...state, posts: action.payload, loading: false, error: null };

		case GET_POST:
			return { ...state, post: action.payload, loading: false, error: null };

		case ADD_POST:
			state.posts.unshift(action.payload);
			return { ...state, loading: false, error: null };

		default:
			return state;
	}
};

export default postReducer;

//postId => upDate => postId => dislike

// i just have to call the updateLikes and it will automatically update the skills

// it will again refresh the posts and it will again refresh the auth
