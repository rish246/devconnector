import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import server from '../apis/server';
import setAuthToken from '../utils/setAuthToken';
import history from '../history';

// Async Thunks for profile actions

export const fetchMyProfile = createAsyncThunk('profile/fetchMyProfile', async (_, { rejectWithValue }) => {
  try {
    if (localStorage.token) {
      server.defaults.headers.common['x-auth-token'] = localStorage.token;
    }
    const response = await server.get('/profiles/me');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const createProfile = createAsyncThunk('profile/createProfile', async ({ formValues, edit = false }, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-type': 'application/json' } };
    setAuthToken(localStorage.token);
    const response = await server.post('/profiles', formValues, config);
    history.push('/dashboard');
    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const addExperience = createAsyncThunk('profile/addExperience', async (formValues, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-type': 'application/json' } };
    setAuthToken(localStorage.token);
    const response = await server.put('/profiles/experience', formValues, config);
    history.push('/dashboard');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const addEducation = createAsyncThunk('profile/addEducation', async (formValues, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-type': 'application/json' } };
    setAuthToken(localStorage.token);
    const response = await server.put('/profiles/education', formValues, config);
    history.push('/dashboard');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const deleteExperience = createAsyncThunk('profile/deleteExperience', async (expId, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.token);
    const response = await server.delete(`/profiles/experience/${expId}`);
	console.log({ response, expId })
    history.push('/dashboard');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const deleteEducation = createAsyncThunk('profile/deleteEducation', async (eduId, { rejectWithValue }) => {
  try {
    setAuthToken(localStorage.token);
    const response = await server.delete(`/profiles/education/${eduId}`);
    history.push('/dashboard');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const deleteProfile = createAsyncThunk('profile/deleteProfile', async (_, { rejectWithValue }) => {
  try {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      await server.delete('/profiles');
      return 'Profile Deleted';
    }
  } catch (err) {
    return rejectWithValue({ msg: err.response?.statusText, status: err.response?.status });
  }
});

export const getAllProfiles = createAsyncThunk('profile/getAllProfiles', async (_, { rejectWithValue }) => {
  try {
    const response = await server.get('/profiles/all');
    history.push('/profiles');
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const getProfileById = createAsyncThunk('profile/getProfileById', async (profileId, { rejectWithValue }) => {
  try {
    const response = await server.get(`/profiles/user/${profileId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

export const getGitRepos = createAsyncThunk('profile/getGitRepos', async (username, { rejectWithValue }) => {
  try {
    const response = await server.get(`/profiles/github/${username}`);
    return response.data;
  } catch (err) {
    return rejectWithValue({ msg: err.message });
  }
});

// The Slice

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    profiles: [],
    repos: [],
    loading: false,
    error: null
  },
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.repos = [];
    },
    accountDeleted: (state) => {
      state.profile = null;
      state.profiles = [];
      state.repos = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
		console.log({ action })
        state.profile = action.payload;
      })
      .addCase(createProfile.rejected, (state, action) => {
		console.log({ action })
        state.loading = false;
        state.error = action.payload;
      })
      // Repeat for other thunks...
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null;
        state.profiles = [];
        state.repos = [];
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getGitRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
      })
	  .addCase(deleteExperience.fulfilled, (state, action) => {
		state.profile = action.payload;
	  })
	  .addCase(deleteEducation.fulfilled, (state, action) => {
		state.profile = action.payload;
	  })
  }
});

export const { clearProfile, accountDeleted } = profileSlice.actions;

export default profileSlice.reducer;
