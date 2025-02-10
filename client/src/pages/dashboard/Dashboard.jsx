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

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);

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
            <Education
                education={profile.education}
                onDelete={(id) => dispatch(deleteEducation(id))}
            />
            <Experience
                experience={profile.experience}
                onDelete={(id) => dispatch(deleteExperience(id))}
            />
            <button
                className="btn btn-danger"
                onClick={() => dispatch(deleteProfile(profile._id))}
            >
                Delete Profile
            </button>
        </Fragment>
    );
};

export default Dashboard;
