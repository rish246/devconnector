// this will be our landing page
import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function Landing() {
    console.log("Render");
    const { isAuthenticated } = useSelector((state) => state.auth);
    const history = useHistory();
    if (isAuthenticated) {
        history.push("/posts");
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and
                        get help from other developers
                    </p>
                    <div className="buttons">
                        <Link to="/signup" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing;
