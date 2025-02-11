import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../apis/server';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';

// Thunks for async actions

export const getPosts = createAsyncThunk('posts/getPosts', async (_, { rejectWithValue }) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await server.get('/posts');
    history.push('/posts');
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getPost = createAsyncThunk('posts/getPost', async (postId, { rejectWithValue }) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await server.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const createPost = createAsyncThunk('posts/createPost', async (formValues, { dispatch, rejectWithValue }) => {
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
    dispatch(getPosts());
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const likePost = createAsyncThunk('posts/likePost', async (postId, { dispatch, rejectWithValue }) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await server.put(`/posts/like/${postId}`);
    dispatch(getPosts());
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const unlikePost = createAsyncThunk('posts/unlikePost', async (postId, { dispatch, rejectWithValue }) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const response = await server.put(`/posts/unlike/${postId}`);
    dispatch(getPosts());
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { dispatch, rejectWithValue }) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    await server.delete(`/posts/${postId}`);
    dispatch(getPosts());
    return postId;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addComment = createAsyncThunk('posts/addComment', async ({ postId, formValues }, { dispatch, rejectWithValue }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

	console.log({ postId })
    const response = await server.put(`/posts/comment/${postId}`, formValues, config);
    dispatch(getPosts());
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

// The slice

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getPost
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // likePost / unlikePost / deletePost / addComment
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      });
  },
});

export default postsSlice.reducer;
