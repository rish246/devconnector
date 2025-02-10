import React, { Component, Fragment, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProfiles } from "../../slices/profiles";
import Spinner from "../../components/Spinner";
import ProfileCard from "../../components/ProfileCard";

function Profiles() {
    const { profiles, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }
    const renderProfiles = profiles.map((profile) => (
        <ProfileCard profile={profile} />
    ));
    return <div className="profiles">{renderProfiles}</div>;
}

export default Profiles;
