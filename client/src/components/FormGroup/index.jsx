import React from "react";
import "./FormGroup.css";
function FormGroup({ title, children }) {
    return (
        <div className="form-group">
            <label className="form-group-label">{title}</label>
            {children}
        </div>
    );
}
export default FormGroup;
