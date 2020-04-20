import { SET_ALERT, REMOVE_ALERT } from './types';
const uuid = require('uuid');

export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id },
	});
	setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const removeAlert = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_ALERT,
		payload: id,
	});
};
