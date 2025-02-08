import React from "react";
import { Modal } from "../layout/Modal";
import { removeAlert } from "../../slices/alerts";
import { useDispatch } from "react-redux";

const Alert = ({ alert }) => {
    const dispatch = useDispatch();

    if (!alert) {
        return null;
    }

    const renderAlert = alert.alerts.map(({ msg, alertType, id }) => (
        <Modal
            message={msg}
            id={id}
            alertType={alertType}
            onClose={() => dispatch(removeAlert(id))}
        />
    ));
    return <>{renderAlert}</>;
};

export default Alert;
