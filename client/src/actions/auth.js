import axios from "axios";
import history from "../history";
import server from "../apis/server";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alerts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addComment } from "./posts";

const initialState = {
  isAuthenticated: false,
  error: [],
  loading: false,
  token: null,
  user: null,
};

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = { email, password };

    try {
      const response = await server.post("/auth", body, config);
      dispatch(loginSuccess(response.data.token))
      dispatch(loadUser());
      return response.data;
    } catch (err) {
      const errors = err.response?.data?.errors || [{ msg: err.message }];
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      return rejectWithValue(errors);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'users/signUpUser',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = { name, email, password };

    try {
      const response = await server.post('/users', body, config);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (err) {
      const errors = err.response?.data?.errors || [{ msg: err.message }];
      console.log({ errors })
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      return rejectWithValue(errors);
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { dispatch, rejectWithValue }) => {
    if (localStorage.token) {
      server.defaults.headers.common['x-auth-token'] = localStorage.token;
    }
  
    try {
      const response = await server.get('/auth');
      dispatch(setActiveUser(response.data));
      return response.data;
    } catch (err) {
      dispatch(authFailed(err));
      return rejectWithValue(err);
    }
  }
);

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    dispatch(logout());
    dispatch({ type: CLEAR_PROFILE });
    history.push('/');
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = undefined;
    },
    setActiveUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = undefined;
    },
    loginSuccess: (state, action) => {
      state.error = [];
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = [];
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { logout, setActiveUser, authFailed, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
