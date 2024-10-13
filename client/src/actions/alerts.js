import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';
import { createSlice } from '@reduxjs/toolkit';

// export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
// 	const id = uuidv4();
// 	dispatch({
// 		type: SET_ALERT,
// 		payload: { msg, alertType, id }
// 	});

// 	setTimeout(() => dispatch(removeAlert(id)), timeout);
// };


// export const removeAlert = id => dispatch => {
// 	dispatch({
// 		type: REMOVE_ALERT,
// 		payload: id
// 	})
// }

const alertSlice = createSlice({
	initialState: { alerts: [] },
	name: 'alert',
	reducers: {
		setAlert: (state, action) => {
			const id = uuidv4();
			state.alerts.push({ id, msg: action.payload, alertType: 'danger' });
		},
		removeAlert: (state, action) => {
			const id = action.payload;
			state.alerts = state.alerts.filter(al => al.id !== id);
		}
	}
})

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;