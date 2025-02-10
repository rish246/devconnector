import React from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

export default function ProfileCard({ profile }) {
    const { user, status, company, location, _id, skills } = profile;

    if (!user) {
        return null;
    }

    const renderSkills = (skills) => {
        return skills.map((skill) => {
            return (
                <li key={uuid()} class="text-primary">
                    <i class="fas fa-check" /> {skill}
                </li>
            );
        });
    };

    return (
        <div class="profile bg-light" key={_id}>
            <img class="round-img" src={user.avatar} />
            <div>
                <h2>{user.name || "User"}</h2>
                <p>
                    {status} at {company}
                </p>
                <p>{location}</p>
                <Link to={`/profiles/${_id}`} class="btn btn-primary">
                    View Profile
                </Link>
            </div>

            <ul>{renderSkills(skills)}</ul>
        </div>
    );
}
