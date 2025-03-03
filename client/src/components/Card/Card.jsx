import React from "react";
import classnames from "classnames";

const Card = ({ children, className }) => {
    const classNames = classnames("bg-white shadow-md rounded-lg", className);
    return <div className={classNames}>{children}</div>;
};

export default Card;
