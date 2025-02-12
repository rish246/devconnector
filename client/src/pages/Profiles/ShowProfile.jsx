import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileById } from "../../slices/profiles";
import Spinner from "../../components/Spinner";
import Profile from "./Profile";

const ShowProfile = ({ id }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getProfileById(id));
    }, [dispatch]);

    const renderSkills = (skills) => {
        return skills.map((skill, index) => (
            <div key={index} className="p-1">
                <i className="fa fa-check" /> {skill}
            </div>
        ));
    };

    const renderExperience = (experience) => {
        return experience.map((exp, index) => (
            <div key={index}>
                <h3 className="text-dark">{exp.company}</h3>
                <p>
                    {exp.from} - {exp.to || "Current"}
                </p>
                <p>
                    <strong>Position: </strong>
                    {exp.position}
                </p>
                <p>
                    <strong>Description: </strong>
                    {exp.description}
                </p>
            </div>
        ));
    };

    const renderEducation = (education) => {
        return education.map((edu, index) => (
            <div key={index}>
                <h3>{edu.school}</h3>
                <p>
                    {edu.from} - {edu.to || "current"}
                </p>
                <p>
                    <strong>Degree: </strong>
                    {edu.degree}
                </p>
                <p>
                    <strong>Field Of Study: </strong>
                    {edu.fieldOfStudy}
                </p>
                <p>
                    <strong>Description: </strong>
                    {edu.description}
                </p>
            </div>
        ));
    };

    if (!profile) return <Spinner />;

    return (
        <section className="container">
            <Link to="/profiles" className="btn btn-light">
                Back To Profiles
            </Link>

            <Profile profile={profile} />
        </section>
    );
};

export default ShowProfile;
