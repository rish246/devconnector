import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfileById } from "../../slices/profiles";
import Spinner from "../../components/Spinner";

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

    const {
        skills,
        _id,
        user,
        status,
        experience,
        education,
        bio,
        company,
        location,
        website,
        social,
    } = profile;

    return (
        <section className="container">
            <Link to="/profiles" className="btn btn-light">
                Back To Profiles
            </Link>

            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <img className="round-img my-1" src={user.avatar} alt="" />
                    <h1 className="large">{user.name}</h1>
                    <p className="lead">
                        {status} {company && `at ${company}`}
                    </p>
                    {location && <p>{location}</p>}
                    <div className="icons my-1">
                        {website && (
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-globe fa-2x" />
                            </a>
                        )}
                        {social?.twitter && (
                            <a
                                href={social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-twitter fa-2x" />
                            </a>
                        )}
                        {social?.facebook && (
                            <a
                                href={social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-facebook fa-2x" />
                            </a>
                        )}
                        {social?.linkedin && (
                            <a
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin fa-2x" />
                            </a>
                        )}
                        {social?.youtube && (
                            <a
                                href={social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-youtube fa-2x" />
                            </a>
                        )}
                        {social?.instagram && (
                            <a
                                href={social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-instagram fa-2x" />
                            </a>
                        )}
                    </div>
                </div>

                <div className="profile-about bg-light p-2">
                    <h2 className="text-primary">{user.name}'s bio</h2>
                    <p>{bio || "No bio provided"}</p>
                    <div className="line" />
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">{renderSkills(skills)}</div>
                </div>

                {experience?.length > 0 && (
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {renderExperience(experience)}
                    </div>
                )}

                {education?.length > 0 && (
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {renderEducation(education)}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ShowProfile;
