import React from "react";
import Table from "../../components/Table";
import classNames from "classnames";
import { FaTrash } from "react-icons/fa";

const TableHeader = ({ title }) => {
    return (
        <th className="bg-blue-50 border py-3 text-sm font-semibold text-gray-700 rounded-2xl text-center">
            {title}
        </th>
    );
};

export function Experience({ experience, onDelete, className }) {
    const config = [
        {
            name: "Company",
            render: (company) => (
                <td className="px-4 py-2 border">{company}</td>
            ),
            header: () => <TableHeader title="Company" />,
        },
        {
            name: "Title",
            render: (title) => <td className="px-4 py-2 border">{title}</td>,
            header: () => <TableHeader title="Title" />,
        },
        {
            name: "Years",
            render: ({ from, to }) => (
                <td className="px-4 py-2 border">
                    {from} - {to || "Current"}
                </td>
            ),
            header: () => <TableHeader title="Years" />,
        },
        {
            name: "Actions",
            render: (id) => (
                <td className="px-4 py-3 text-center">
                    <button
                        className="p-2 text-red-600 transition-colors duration-200 rounded-md hover:bg-red-100 hover:text-red-700 hover:cursor-pointer"
                        onClick={() => onDelete(id)}
                    >
                        <FaTrash />
                    </button>
                </td>
            ),
            header: () => <TableHeader title="Actions" />,
        },
    ];

    if (!experience || experience.length === 0) {
        return <p className="text-muted">No experience records found.</p>;
    }

    const data = experience.map(({ company, title, from, to, id }) => {
        return [company, title, { from, to }, id];
    });

    const finalClassName = classNames(
        "rounded-lg shadow-md w-full overflow-hidden",
        className
    );

    return (
        <div className="my-6">
            <Table
                config={config}
                data={data}
                className={finalClassName}
                headerClassName="bg-blue-50 border-b"
            />
        </div>
    );
}

export default Experience;
