import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCreate from "./PostCreate";
import PostList from "./PostList";
import { loadUser } from "../../slices/auth";
import Spinner from "../../components/Spinner";
const Posts = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading); // Get loading state from Redux

    useEffect(() => {
        dispatch(loadUser()); // Dispatch loadUser action on component mount
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <PostCreate />
            <PostList />
        </div>
    );
};

export default Posts;
