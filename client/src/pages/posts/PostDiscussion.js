import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, useParams } from 'react-router-dom';

import { addComment, getPost } from '../../slices/posts';
import Spinner from '../layouts/Spinner';

const PostDiscussion = ({ handleSubmit }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  
  const post = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getPost(postId)); // Fetch the post when the component mounts
  }, [dispatch, postId]);

  const renderTextArea = ({ input, name, cols, rows, placeholder }) => (
    <textarea name={name} cols={cols} rows={rows} placeholder={placeholder} {...input} />
  );

  const onSubmit = (formValues) => {
    dispatch(addComment({ postId, formValues })); // Dispatch the addComment action
  };

  const renderPost = () => (
    <section className="container">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to="profile.html">
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            component={renderTextArea}
          />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </section>
  );

  const renderComments = (comments) => (
    comments.map((comment) => (
      <div className="post bg-white p-1 my-1" key={comment._id}>
        <div>
          <Link to="profile.html">
            <img className="round-img" src={comment.avatar} alt="" />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{comment.text}</p>
          <p className="post-date">Posted on {comment.date}</p>
        </div>
      </div>
    ))
  );

  if (!post) {
    return <Spinner />;
  }

  return (
    <div>
      {renderPost()}
      {post.comments && post.comments.length > 0 ? (
        renderComments(post.comments)
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

// Wrap the component with redux-form
const wrappedForm = reduxForm({
  form: 'commentForm'
})(PostDiscussion);

export default wrappedForm;
