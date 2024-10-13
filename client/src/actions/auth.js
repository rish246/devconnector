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
// make user registration action =>
// we are making use of redux thunk
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
      header: {
        "Content-type": "application/json",
      },
    };

    const body = { email, password };

    //make the req to the server
    try {
      const response = await server.post("/auth", body, config);

      console.log(response.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });

      localStorage.token = response.data.token;
      //dispatch the load user function after the login period
      dispatch(loadUser());

	  return response.data;
    } catch (err) {
      const errors = err.response.data.errors;
      // for each error we set an alert with a timeout of 5 seconds and type =  'danger'
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
        payload: errors
      });

	  return rejectWithValue(errors);
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    // signUpUser: (state, action) => {},
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.token = undefined;
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
			state.user = action.payload; // Set user data
		  })
		  .addCase(signInUser.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload; // Set error message
		  })
      .addCase(signOutUser.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
	  }
});


// export const { signInUse÷r } = authSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
// // i have to store it in the local storage that's it

// // i have not made any reducer and not used any auth token
// // focus on getting the token and saying that the user is logged in or not
// // complete the other action creators related to auth => load user and signOut the user
export const signUpUser = ({ name, email, password }) => async (dispatch) => {
	// make a check that whether password != password2
	const config = {
		header: {
			'Content-Type': 'application/json'
		}
	};
	const body = { name, email, password };

	//sending a response should be a tryCatch block
	try {
		const response = await server.post('/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response.data
		});

		localStorage.token = response.data.token;
	} catch (err) {
		const errors = err.response.data.errors;
		// for each error we set an alert with a timeout of 5 seconds and type =  'danger'
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};
// // now i have to make an action to load the user once every component loads up
export const loadUser = () => async (dispatch) => {
	// we are not sending the token
	if (localStorage.token) {
		server.defaults.headers.common['x-auth-token'] = localStorage.token;
	}

	try {
		const response = await server.get('/auth');

		// in response, i got the user creds => user the id to set the user
		dispatch({
			type: USER_LOADED,
			payload: response.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// last job is to signOut user
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { dispatch }) => {
    localStorage.setItem('token', undefined);
    dispatch(logout());
    // dispatch(clearProfile()) // This belongs to 
    dispatch({ type: CLEAR_PROFILE });

    history.push('/')
  }
);
