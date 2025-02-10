import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { createPost } from '../../slices/posts';

const PostCreate = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const renderTextArea = ({ input, name, cols, rows, placeholder }) => (
    <textarea name={name} cols={cols} rows={rows} placeholder={placeholder} {...input} />
  );

  const onSubmit = (formValues) => {
    dispatch(createPost(formValues));
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>

      <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          component={renderTextArea}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

// Wrap the component with redux-form
const wrappedForm = reduxForm({
  form: 'addPostForm'
})(PostCreate);

export default wrappedForm;
