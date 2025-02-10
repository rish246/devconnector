import React from "react";
import Table from "../../components/Table";

export function Education({ education, onDelete }) {
    const config = [
        {
            name: "School",
            render: (school) => <td>{school}</td>,
        },
        {
            name: "Degree",
            render: (degree) => <td>{degree}</td>,
        },
        {
            name: "Years",
            render: ({ from, to }) => (
                <td>
                    {from} - {to ? to : "current"}
                </td>
            ),
        },
        {
            name: "Actions",
            render: (id) => (
                <td>
                    <button className="bg-red-500" onClick={() => onDelete(id)}>
                        Delete
                    </button>
                </td>
            ),
        },
    ];

    const data = education.map(({ school, degree, from, id }) => {
        const years = 3; // todo: fix this
        return [school, degree, years, id];
    });

    if (data.length == 0) {
        return null;
    }
    return <Table config={config} data={data} />;
}
export default Education;
