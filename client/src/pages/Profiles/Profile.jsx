import React from "react";
import Education from "../dashboard/Education";
import Experience from "../dashboard/Experience";

export default function Profile({ profile }) {
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
        <div className="profile-grid my-1">
            <div className="profile-top bg-blue-200 p-2">
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
                <div className="bg-white p-2">
                    <h2 className="text-primary mb-4">Experience</h2>
                    {<Experience experience={experience} />}
                </div>
            )}

            {education?.length > 0 && (
                <div className="bg-white p-2">
                    <h2 className="text-primary mb-4">Education</h2>
                    <Education education={education} />
                </div>
            )}
        </div>
    );
}

const renderSkills = (skills) => {
    return skills.map((skill, index) => (
        <div key={index} className="p-1">
            <i className="fa fa-check" /> {skill}
        </div>
    ));
};
