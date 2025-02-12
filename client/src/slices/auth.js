import axios from "axios";
import history from "../history";
import server from "../apis/server";
import { setAlert } from "./alerts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    error: [],
    loading: false,
    token: null,
    user: null,
};

export const signInUser = createAsyncThunk(
    "auth/signInUser",
    async ({ email, password }, { rejectWithValue }) => {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const body = { email, password };

        try {
            // First, post to /auth to get the token
            const loginResponse = await server.post("/auth", body, config);
            const token = loginResponse.data.token;
            localStorage.setItem("token", token);
            server.defaults.headers.common["x-auth-token"] = token;

            // Next, load the user data using the token
            const userResponse = await server.get("/auth");
            return { token, user: userResponse.data };
        } catch (err) {
            const errors = err.response?.data?.errors || [{ msg: err.message }];
            errors.forEach((error) => {
                // Show alerts (side effect); these alerts can be managed by their own slice/middleware
                setAlert(error.msg, "danger");
            });
            return rejectWithValue(errors);
        }
    }
);

export const signUpUser = createAsyncThunk(
    "users/signUpUser",
    async ({ name, email, password }, { rejectWithValue }) => {
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const body = { name, email, password };

        try {
            // Create the user and get the token in the response
            const response = await server.post("/users", body, config);
            const token = response.data.token;
            localStorage.setItem("token", token);
            server.defaults.headers.common["x-auth-token"] = token;

            // Load user data with the token
            const userResponse = await server.get("/auth");
            return { token, user: userResponse.data };
        } catch (err) {
            const errors = err.response?.data?.errors || [{ msg: err.message }];
            errors.forEach((error) => {
                setAlert(error.msg, "danger");
            });
            return rejectWithValue(errors);
        }
    }
);

export const loadUser = createAsyncThunk(
    "auth/loadUser",
    async (_, { rejectWithValue }) => {
        if (localStorage.token) {
            server.defaults.headers.common["x-auth-token"] = localStorage.token;
        }

        try {
            const response = await server.get("/auth");
            return response.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const signOutUser = createAsyncThunk(
    "auth/signOutUser",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token");
            delete server.defaults.headers.common["x-auth-token"];
            history.push("/");
            return; // Nothing to return
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // These reducers can be used if you want to manually change state
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
            state.token = null;
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
            state.token = null;
        },
        loginSuccess: (state, action) => {
            state.error = [];
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload;
            localStorage.setItem("token", state.token);
        },
    },
    extraReducers: (builder) => {
        builder
            // signInUser
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // signUpUser
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.error = [];
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // loadUser
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // signOutUser
            .addCase(signOutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setActiveUser, authFailed, loginSuccess } =
    authSlice.actions;
export default authSlice.reducer;
