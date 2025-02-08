import { ValidationResult } from "./validators";

export function evaluate(value, validators, formData) {
    const errors = validators
        .map((validator) => validator.test(value, formData))
        .filter((res) => res.type === ValidationResult.Failed);

    if (errors.length === 0) {
        return [];
    }

    return errors.map((error) => error.error);
}
