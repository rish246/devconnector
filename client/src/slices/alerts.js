import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

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