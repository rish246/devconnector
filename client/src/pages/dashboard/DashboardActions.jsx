// this page will represent the dashboard actions
import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/profile/edit" className="btn btn-light">
                <i className="fas fa-user-circle text-primary" /> Edit Profile
            </Link>
            <Link to="/experience/new" className="btn btn-light">
                <i className="fab fa-black-tie text-primary" /> Add Experience
            </Link>
            <Link to="/education/new" className="btn btn-light">
                <i className="fas fa-graduation-cap text-primary" /> Add
                Education
            </Link>
        </div>
    );
};

export default DashboardActions;
