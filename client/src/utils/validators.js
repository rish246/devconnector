export class ValidateRequired {
    constructor(errorText) {
        this.errorText = errorText || "Field is required";
    }

    test(value) {
        if (value == null || value === "") {
            return {
                type: ValidationResult.Failed,
                error: this.errorText,
            };
        }

        return {
            type: ValidationResult.Success,
        };
    }
}

export class ValidateEmail {
    constructor(errorText) {
        this.errorText = errorText || "Invalid Email Address";
    }

    test(value) {
        if (value == null || value === "") {
            return {
                type: ValidationResult.Failed,
                error: this.errorText,
            };
        }

        const validEmail = String(value)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!validEmail) {
            return {
                type: ValidationResult.Failed,
                error: this.errorText,
            };
        }

        return {
            type: ValidationResult.Success,
        };
    }
}

export const ValidationResult = {
    Success: 0,
    Failed: 1,
};
