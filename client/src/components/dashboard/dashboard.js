import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, deleteProfile } from "../../slices/profiles";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  const renderComponent = () => {
    if (loading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    } else if (!profile) {
      return (
        <div>
          <h3>OOPS..!! It looks like you don't have a profile</h3>
          <Link to="/profile/create">Create Profile</Link>
        </div>
      );
    } else {
      return (
        <Fragment>
          <DashboardActions />
          <Education />
          <Experience />
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteProfile(profile._id))}
          >
            Delete Profile
          </button>
        </Fragment>
      );
    }
  };

  return <div>{renderComponent()}</div>;
};

export default Dashboard;
