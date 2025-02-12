import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyProfile } from "../../slices/profiles";
import Spinner from "../../components/Spinner";
import DashboardActions from "./DashboardActions";
import ShowProfile from "../Profiles/ShowProfile";
import Profile from "../Profiles/Profile";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    // const { user } = useSelector((state) => state.auth);

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
            <Profile profile={profile} />
        </Fragment>
    );
};

export default Dashboard;
