import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addExperience } from "../../slices/profiles";
import Alert from "../../components/Alert";
import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import { useForm } from "../../hooks/use-form";
import { ValidateRequired } from "../../utils/validators";

const AddExperience = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    const [currentJob, setCurrentJob] = React.useState(false);

    const validators = {
        title: [new ValidateRequired()],
        company: [new ValidateRequired()],
        from: [new ValidateRequired()],
    };

    const { formData, errors, handleChange } = useForm(
        {
            title: "",
            company: "",
            location: "",
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

        const experienceData = {
            ...formData,
            current: currentJob,
            to: currentJob ? "" : formData.to,
        };

        dispatch(addExperience(experienceData));
    };

    return (
        <section className="container">
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any
                developer/programming positions you've had
            </p>
            <small>* = required field</small>
            <Alert alert={alert} />

            <form className="form" onSubmit={handleSubmit}>
                <FormGroup title="* Job Title">
                    <FormField
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={formData.title}
                        errors={errors.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup title="* Company">
                    <FormField
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={formData.company}
                        errors={errors.company}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup title="Location">
                    <FormField
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup title="From Date*">
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
                            checked={currentJob}
                            onChange={(e) => setCurrentJob(e.target.checked)}
                        />{" "}
                        Current Job
                    </label>
                </FormGroup>

                {!currentJob && (
                    <FormGroup title="To Date">
                        <FormField
                            type="date"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            disabled={currentJob}
                        />
                    </FormGroup>
                )}

                <FormGroup title="Job Description">
                    <FormField
                        type="textarea"
                        name="description"
                        placeholder="Job Description"
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

export default AddExperience;
