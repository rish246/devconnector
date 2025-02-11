import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMyProfile,
    deleteProfile,
    deleteEducation,
    deleteExperience,
} from "../../slices/profiles";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import ShowProfile from "../Profiles/ShowProfile";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);
    // wrong way of using useEffect
    useEffect(() => {
        dispatch(fetchMyProfile());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (!profile) {
        return (
            <div>
                <h3>OOPS..!! It looks like you don't have a profile</h3>
                <Link to="/profile/create">Create Profile</Link>
            </div>
        );
    }

    return (
        <Fragment>
            <DashboardActions />
            <ShowProfile id={user.id} />
        </Fragment>
    );
};

export default Dashboard;
