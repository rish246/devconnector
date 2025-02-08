import React from "react";
import "./Modal.css";

export default ({ message, id, onClose }) => {
    return (
        <div key={id} className="Modal-overlay">
            <div className={`Modal`}>
                <h3>{message}</h3>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
