import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../apis/server";
import setAuthToken from "../utils/setAuthToken";
import history from "../history";

// Thunks for async actions

export const getPosts = createAsyncThunk(
    "posts/getPosts",
    async (_, { rejectWithValue }) => {
        try {
            console.log("getPosts");
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const response = await server.get("/posts");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getPost = createAsyncThunk(
    "posts/getPost",
    async (postId, { rejectWithValue }) => {
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
    }
);

export const createPost = createAsyncThunk(
    "posts/createPost",
    async (formValues, { dispatch, rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            const response = await server.post("/posts", formValues, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const likePost = createAsyncThunk(
    "posts/likePost",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const response = await server.put(`/posts/like/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const unlikePost = createAsyncThunk(
    "posts/unlikePost",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const response = await server.put(`/posts/unlike/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            await server.delete(`/posts/${postId}`);
            return postId;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const addComment = createAsyncThunk(
    "posts/addComment",
    async ({ postId, formValues }, { dispatch, rejectWithValue }) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            const response = await server.put(
                `/posts/comment/${postId}`,
                formValues,
                config
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// The slice

const postsSlice = createSlice({
    name: "posts",
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
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const postIndex = state.posts.findIndex(
                    (post) => post._id === action.payload._id
                );
                state.posts[postIndex] = action.payload;
            })
            .addCase(unlikePost.fulfilled, (state, action) => {
                const postIndex = state.posts.findIndex(
                    (post) => post._id === action.payload._id
                );
                state.posts[postIndex] = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload
                );
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const postIndex = state.posts.findIndex(
                    (post) => post._id === action.payload._id
                );
                state.posts[postIndex] = action.payload;
            });
    },
});

export default postsSlice.reducer;
