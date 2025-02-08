import React from "react";
import { v4 as uuid } from "uuid";
import "./FormField.css";

function FormField({ type, placeholder, name, className, errors, ...rest }) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                className={className}
                name={name}
                {...rest}
            />

            {errors.map((error) => (
                <p key={uuid()} className="form-error">
                    {error}
                </p>
            ))}
        </>
    );
}

export default FormField;
