import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts, likePost, unlikePost, deletePost } from '../../slices/posts';
import { loadUser } from '../../slices/auth';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getPosts());
  }, [dispatch]);

  const renderDeleteButton = ({ _id, user: postUser }) => {
    if (user._id.toString() === postUser) {
      return (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => dispatch(deletePost(_id))}
        >
          <i className="fas fa-times" />
        </button>
      );
    }
    return null;
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <div className="post bg-white p-1 my-1" key={post._id}>
        <div>
          <Link to={`/profiles`}>
            <img className="round-img" src={post.avatar} alt="" />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{post.text}</p>
          <p className="post-date">Posted on {post.date}</p>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => dispatch(likePost(post._id))}
          >
            <i className="fas fa-thumbs-up" />
            <span>{post.likes.length}</span>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => dispatch(unlikePost(post._id))}
          >
            <i className="fas fa-thumbs-down" />
          </button>
          <Link to={`/posts/${post._id}`} className="btn btn-primary">
            Discussion <span className="comment-count">{post.comments.length}</span>
          </Link>
          {renderDeleteButton(post)}
        </div>
      </div>
    ));
  };

  return <div>{renderPosts()}</div>;
};

export default PostList;
