// to make a dummy reducer of this component
// import combineReducers from redux
// put a dummy function

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import alertReducer from './alertReducer';

export default combineReducers({
	alert: alertReducer,
	form: formReducer,
	auth: authReducer,
	profile: profileReducer
});

// thus auth state will have all the info related to authentication of the user
