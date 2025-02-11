import React from "react";
import "./Table.css";
import classNames from "classnames";
import { nanoid } from "nanoid";

function Table({ config, data, className, headerClassName }) {
    const header = config.map(({ name, header }) => {
        if (header) {
            return header();
        }
        return (
            <th className="table-header border" key={nanoid()}>
                {name}
            </th>
        );
    });

    const body = data.map((row) => {
        return (
            <tr className="text-center border">
                {row.map((cell, idx) => config[idx].render(cell))}
            </tr>
        );
    });

    const finalClassName = classNames(
        // "border",
        // "w-[100%]",
        // "h-[100%]",
        className
    );

    return (
        <table className={finalClassName}>
            <thead>
                <tr className={headerClassName}>{header}</tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    );
}

export default Table;
