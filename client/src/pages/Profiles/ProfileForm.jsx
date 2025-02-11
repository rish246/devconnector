import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createProfile } from "../../slices/profiles";
import Alert from "../../components/Alert";
import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import { useForm } from "../../hooks/use-form";
import { ValidateRequired } from "../../utils/validators";

const ProfileForm = ({ edit = false, initialValues = null }) => {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);

    const validators = {
        status: [new ValidateRequired()],
        skills: [new ValidateRequired()],
        status: [],
        company: [],
        website: [],
        location: [],
        skills: [],
        githubusername: [],
        bio: [],
        twitter: [],
        facebook: [],
        youtube: [],
        linkedin: [],
        instagram: [],
    };

    const initialState = initialValues || {
        status: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        youtube: "",
        linkedin: "",
        instagram: "",
    };

    const { formData, errors, handleChange } = useForm(
        initialState,
        validators
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((err) => err.length > 0);
        if (hasErrors) return;
        dispatch(createProfile({ formValues: formData, edit }));
    };

    return (
        <section className="container">
            <h1 className="large text-primary">
                {edit ? "Edit" : "Create"} Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user" />{" "}
                {edit ? "Update" : "Let's get some"}
                information to make your profile stand out
            </p>
            <small>* = required field</small>
            <Alert alert={alert} />
            <form className="form" onSubmit={handleSubmit}>
                <FormGroup title="Status*">
                    <FormField
                        type="text"
                        placeholder="Status"
                        name="status"
                        value={formData.status}
                        errors={errors.status}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Eg: Junior Dev/ Senior Dev/ Student/ Intern etc
                    </small>
                </FormGroup>

                <FormGroup title="Company">
                    <FormField
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </FormGroup>

                <FormGroup title="Website">
                    <FormField
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </FormGroup>

                <FormGroup title="Location">
                    <FormField
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </FormGroup>

                <FormGroup title="Skills*">
                    <FormField
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={formData.skills}
                        errors={errors.skills}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Use comma-separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </FormGroup>

                <FormGroup title="Github Username">
                    <FormField
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={formData.githubusername}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Include your username for Github repos
                    </small>
                </FormGroup>

                <FormGroup title="Bio">
                    <FormField
                        type="textarea"
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <small className="form-text">
                        Tell us a little about yourself
                    </small>
                </FormGroup>

                <div className="my-2">
                    <button type="button" className="btn btn-light">
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                <FormGroup title="Twitter" icon="fab fa-twitter">
                    <FormField
                        type="text"
                        placeholder="Twitter URL"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup title="Facebook" icon="fab fa-facebook">
                    <FormField
                        type="text"
                        placeholder="Facebook URL"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup title="YouTube" icon="fab fa-youtube">
                    <FormField
                        type="text"
                        placeholder="YouTube URL"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup title="LinkedIn" icon="fab fa-linkedin">
                    <FormField
                        type="text"
                        placeholder="Linkedin URL"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup title="Instagram" icon="fab fa-instagram">
                    <FormField
                        type="text"
                        placeholder="Instagram URL"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
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

export default ProfileForm;
