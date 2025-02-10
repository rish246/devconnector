import React from "react";
import "./Table.css";
import classNames from "classnames";
import { nanoid } from "nanoid";

function Table({ config, data, className }) {
    const header = config.map(({ name }) => {
        return (
            <th className="table-header" key={nanoid()}>
                {name}
            </th>
        );
    });

    const body = data.map((row) => {
        return <tr>{row.map((cell, idx) => config[idx].render(cell))}</tr>;
    });

    const finalClassName = classNames("table", "table-bordered", className);

    return (
        <table className={finalClassName}>
            <thead>
                <tr>{header}</tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    );
}

export default Table;
