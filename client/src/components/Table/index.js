import React from "react";

function Table({ config, data, className }) {
    const header = config.map(({ name, heading }) => {
        if (heading) return heading();
        return <th>{name}</th>;
    });

    const body = data.map((row) => {
        return <tr>{row.map((cell, idx) => config[idx].render(cell))}</tr>;
    });

    return (
        <table className={className}>
            <thead>{header}</thead>
            <tbody>{body}</tbody>
        </table>
    );
}

export default Table;
