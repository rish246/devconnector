import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProfiles } from "../../slices/profiles";
import Spinner from "../../components/Spinner";
class Profiles extends Component {
    componentDidMount() {
        this.props.getAllProfiles();
    }

    renderSkills(skills) {
        return skills.map((skill) => {
            return (
                <li class="text-primary">
                    <i class="fas fa-check" /> {skill}
                </li>
            );
        });
    }

    renderProfiles = () => {
        const renderProfiles = this.props.profiles.map(
            ({
                user,
                status,
                bio,
                company,
                location,
                website,
                _id,
                skills,
            }) => {
                if (!user) return null;

                console.log(user);
                return (
                    <div class="profile bg-light" key={_id}>
                        <img class="round-img" src={user.avatar} />
                        <div>
                            <h2>{user.name || "User"}</h2>
                            <p>
                                {status} at {company}
                            </p>
                            <p>{location}</p>
                            <Link
                                to={`/profiles/${_id}`}
                                class="btn btn-primary"
                            >
                                View Profile
                            </Link>
                        </div>

                        <ul>{this.renderSkills(skills)}</ul>
                    </div>
                );
            }
        );

        return renderProfiles;
    };
    render() {
        if (!this.props.profiles) {
            return (
                <Fragment>
                    <Spinner />
                </Fragment>
            );
        }

        console.log(this.props.profiles);
        return <div className="profiles">{this.renderProfiles()}</div>;
    }
}

const mapStateToProps = (state) => {
    const { profiles } = state.profile;
    return { profiles };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
