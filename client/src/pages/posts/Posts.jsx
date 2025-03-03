import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PostCreate from "./PostCreate";
import PostList from "./PostList";
import ProfileCard from "../Profiles/ProfileCard";
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
        <section className="flex flex-row gap-10">
            <ProfileCard className="h-[300px] w-[300px] mr-1 mt-0 overflow-hidden " />
            <section className="flex flex-col w-full">
                <PostCreate />
                <PostList />
            </section>
        </section>
    );
};

export default Posts;
