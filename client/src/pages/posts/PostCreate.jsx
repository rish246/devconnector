import React from "react";
// import FormField from "../../components/FormField";
import FormTextArea from "../../components/FormTextArea";
import { useDispatch } from "react-redux";
import { createPost } from "../../slices/posts";
import { useForm } from "../../hooks/use-form";
import { ValidateRequired } from "../../utils/validators";

const PostCreate = ({ handleSubmit }) => {
    const dispatch = useDispatch();
    const { formData, errors, handleChange, resetForm } = useForm(
        { text: "" },
        {
            text: [new ValidateRequired()],
        }
    );

    const onSubmit = (formValues) => {
        const hasError = Object.values(errors).some((val) => val.length > 0);
        if (hasError) {
            return;
        }
        console.log({ formValues });
        dispatch(createPost(formValues)); // This is created
        resetForm(); // ohh..
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>

            <form
                className="form my-1"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                }}
            >
                <FormTextArea
                    rows={5}
                    cols={30}
                    name="text"
                    errors={errors.text}
                    placeholder="whats on your mind!"
                    value={formData.text}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    className="btn btn-dark my-1"
                    value="Submit"
                />
            </form>
        </div>
    );
};

export default PostCreate;
