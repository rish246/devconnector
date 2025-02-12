import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getPosts, likePost, unlikePost, deletePost } from "../../slices/posts";
import { loadUser } from "../../slices/auth";
import Spinner from "../../components/Spinner";

const selectPostsState = (state) => state.post;
const selectAuthState = (state) => state.auth;

const selectPosts = createSelector([selectPostsState], (post) => post.posts);

const selectLoading = createSelector(
    [selectPostsState],
    (post) => post.loading
);

const selectError = createSelector([selectPostsState], (post) => post.error);

const selectUser = createSelector([selectAuthState], (auth) => auth.user);

const PostItem = React.memo(({ post, currentUser }) => {
    const dispatch = useDispatch();

    const handleLike = useCallback(
        () => dispatch(likePost(post._id)),
        [dispatch, post._id]
    );

    const handleUnlike = useCallback(
        () => dispatch(unlikePost(post._id)),
        [dispatch, post._id]
    );

    const handleDelete = useCallback(
        () => dispatch(deletePost(post._id)),
        [dispatch, post._id]
    );

    const showDeleteButton = currentUser?._id === post.user;

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profiles/${post.user}`}>
                    <img
                        className="round-img"
                        src={post.avatar}
                        alt={post.name}
                    />
                    <h4>{post.name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{post.text}</p>
                <p className="post-date">
                    Posted on {format(new Date(post.date), "MMM dd, yyyy")}
                </p>

                <div className="post-actions">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleLike}
                        aria-label="Like post"
                    >
                        <i className="fas fa-thumbs-up" />
                        <span>{post.likes.length}</span>
                    </button>

                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleUnlike}
                        aria-label="Unlike post"
                    >
                        <i className="fas fa-thumbs-down" />
                    </button>

                    <Link
                        to={`/posts/${post._id}`}
                        className="btn btn-primary"
                        aria-label="View discussion"
                    >
                        Discussion{" "}
                        <span className="comment-count">
                            {post.comments.length}
                        </span>
                    </Link>

                    {showDeleteButton && (
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={handleDelete}
                            aria-label="Delete post"
                        >
                            <i className="fas fa-times" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});

const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const user = useSelector(selectUser);

    // Memoized fetch posts

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    // // Memoize posts list
    const memoizedPosts = useCallback(
        () =>
            posts.map((post) => (
                <PostItem key={post._id} post={post} currentUser={user} />
            )),
        [posts, user]
    );

    if (loading) return <Spinner />;

    if (error)
        return (
            <div className="alert alert-danger">
                Error loading posts: {error.message}
            </div>
        );

    return (
        <section className="container">
            {posts.length === 0 ? (
                <div className="alert alert-info">
                    No posts found. Be the first to create one!
                </div>
            ) : (
                memoizedPosts()
            )}
        </section>
    );
};

export default React.memo(PostList);
