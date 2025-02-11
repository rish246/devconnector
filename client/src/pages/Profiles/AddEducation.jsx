import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addEducation } from "../../slices/profiles";
import Alert from "../../components/Alert";
import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import { useForm } from "../../hooks/use-form";
import { ValidateRequired } from "../../utils/validators";

const AddEducation = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    const [currentEducation, setCurrentEducation] = useState(false);

    const validators = {
        school: [new ValidateRequired()],
        degree: [new ValidateRequired()],
        fieldofstudy: [new ValidateRequired()],
        from: [new ValidateRequired()],
    };

    const { formData, errors, handleChange } = useForm(
        {
            school: "",
            degree: "",
            fieldofstudy: "",
            from: "",
            to: "",
            current: false,
            description: "",
        },
        validators
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((err) => err.length > 0);
        if (hasErrors) return;

        const educationData = {
            ...formData,
            current: currentEducation,
            to: currentEducation ? "" : formData.to,
        };

        dispatch(addEducation(educationData));
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Add Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any educational
                experience
            </p>
            <small>* = required field</small>
            <Alert alert={alert} />

            <form className="form" onSubmit={handleSubmit}>
                <FormGroup title="* School/Bootcamp">
                    <FormField
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={formData.school}
                        errors={errors.school}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup title="* Degree/Certificate">
                    <FormField
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={formData.degree}
                        errors={errors.degree}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup title="* Field of Study">
                    <FormField
                        type="text"
                        placeholder="* Field Of Study"
                        name="fieldofstudy"
                        value={formData.fieldofstudy}
                        errors={errors.fieldofstudy}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup title="* From Date">
                    <FormField
                        type="date"
                        name="from"
                        value={formData.from}
                        errors={errors.from}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                        <input
                            type="checkbox"
                            name="current"
                            checked={currentEducation}
                            onChange={(e) =>
                                setCurrentEducation(e.target.checked)
                            }
                        />{" "}
                        Current School/Bootcamp
                    </label>
                </FormGroup>

                {!currentEducation && (
                    <FormGroup title="To Date">
                        <FormField
                            type="date"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            disabled={currentEducation}
                        />
                    </FormGroup>
                )}

                <FormGroup title="Description">
                    <FormField
                        type="textarea"
                        name="description"
                        placeholder="Program Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                    />
                </FormGroup>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </section>
    );
};

export default AddEducation;
