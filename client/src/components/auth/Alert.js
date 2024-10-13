import React, { useEffect } from 'react'
import { Modal } from '../../components/layout/Modal';
import { removeAlert } from '../../actions/alerts';
import { useDispatch, useSelector } from 'react-redux';

const Alert = ({ alert }) => {
    const dispatch = useDispatch();

    if (!alert) {
		return null;
	}

	const renderAlert = alert.alerts.map(({ msg, alertType, id }) => <Modal message={msg} id={id} alertType={alertType} onClose={() => dispatch(removeAlert(id))}/>);
    return <>{renderAlert}</>;
};


export default Alert;