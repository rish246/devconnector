import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./FormTextArea.css";

function FormTextArea({
    rows,
    cols,
    value,
    className,
    onChange,
    errors,
    ...rest
}) {
    return (
        <>
            <textarea
                rows={rows}
                cols={cols}
                className={className}
                value={value}
                onChange={onChange}
                {...rest}
            />

            {errors?.map((error) => (
                <p key={uuid()} className="form-error">
                    {error}
                </p>
            ))}
        </>
    );
}

export default FormTextArea;
