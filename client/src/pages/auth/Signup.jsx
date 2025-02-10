import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUpUser } from "../../slices/auth";
import Alert from "../../components/Alert";

import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import { useForm } from "../../hooks/use-form";
import {
    ValidateEmail,
    ValidateMatch,
    ValidateRequired,
} from "../../utils/validators";

const Signup = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useSelector((state) => state.alert);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const initialState = { name: "", email: "", password: "", password2: "" };
    const validators = {
        name: [new ValidateRequired()],
        email: [new ValidateRequired(), new ValidateEmail()],
        password: [new ValidateRequired()],
        password2: [
            new ValidateRequired(),
            new ValidateMatch("password", "Password must match"),
        ],
    };

    const { formData, errors, handleChange } = useForm(
        initialState,
        validators
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).some((err) => err.length > 0)) return;
        dispatch(signUpUser(formData));
    };

    if (isAuthenticated) {
        history.push("/dashboard");
    }

    return (
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" /> Create Your Account
            </p>
            <Alert alert={alert} />
            <form className="form" onSubmit={handleSubmit}>
                <FormGroup title="Name">
                    <FormField
                        type="text"
                        placeholder="Name"
                        name="name"
                        errors={errors.name}
                        onChange={handleChange}
                    />
                </FormGroup>
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
                <FormGroup title="Confirm Password">
                    <FormField
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        errors={errors.password2}
                        onChange={handleChange}
                    />
                </FormGroup>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </section>
    );
};

export default Signup;
