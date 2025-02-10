import React from "react";
import Table from "../../components/Table";

export function Experience({ experience, onDelete }) {
    const config = [
        {
            name: "Company",
            render: (company) => <td>{company}</td>,
        },
        {
            name: "Title",
            render: (title) => <td>{title}</td>,
        },
        {
            name: "Years",
            render: ({ from, to }) => (
                <td>
                    {from} - {to || "current"}
                </td>
            ),
        },
    ];

    if (!experience || experience.length === 0) {
        return <p className="text-muted">No experience records found.</p>;
    }

    const data = experience.map(({ title, company, from, to }) => {
        return [title, company, 3];
    });
    return <Table config={config} data={data} />;
}

export default Experience;
