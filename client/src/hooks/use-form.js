import React, { useState } from "react";
import { evaluate } from "../utils/Evaluator";

export const useForm = (initialState, validators) => {
    const initialErrors = getInitialErrors(initialState);
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const handleChange = (e) => {
        setFormData((curData) => ({
            ...curData,
            [e.target.name]: e.target.value,
        }));

        if (validators[e.target.name]) {
            setErrors((curErrors) => ({
                ...curErrors,
                [e.target.name]: evaluate(
                    e.target.value,
                    validators[e.target.name],
                    formData
                ),
            }));
        }
    };

    return { formData, errors, handleChange };
};

function getInitialErrors(state) {
    const errors = {};
    for (let field of Object.keys(state)) {
        errors[field] = [];
    }
    return errors;
}
