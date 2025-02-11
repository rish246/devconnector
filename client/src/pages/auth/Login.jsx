import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signInUser } from "../../slices/auth";
import Alert from "../../components/Alert";
import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import { useForm } from "../../hooks/use-form";
import { ValidateEmail, ValidateRequired } from "../../utils/validators";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const alert = useSelector((state) => state.alert);

    const validators = {
        email: [new ValidateRequired(), new ValidateEmail()],
        password: [new ValidateRequired()],
    };

    const { formData, errors, handleChange } = useForm(
        { email: "", password: "" },
        validators
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((err) => err.length > 0);
        if (hasErrors) return;
        dispatch(signInUser(formData));
    };

    if (isAuthenticated) {
        history.push("/posts");
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign into Your Account
            </p>
            <Alert alert={alert} />
            <form className="form" onSubmit={handleSubmit}>
                <FormGroup title="Email">
                    <FormField
                        type="email"
                        placeholder="Email"
                        name="email"
                        errors={errors.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup title="Password">
                    <FormField
                        type="password"
                        placeholder="Password"
                        name="password"
                        errors={errors.password}
                        onChange={handleChange}
                    />
                </FormGroup>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </section>
    );
};

export default Login;
