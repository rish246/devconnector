import React from "react";
import Table from "../../components/Table";
import classNames from "classnames";
import { FaTrash } from "react-icons/fa";
// import { TrashIcon } from "@heroicons/react/24/outline";
const TableHeader = ({ title }) => {
    return (
        <th className="bg-blue-50 border py-3 text-sm font-semibold text-gray-700 rounded-2xl text-center">
            {title}
        </th>
    );
};

export function Education({ education, onDelete, className }) {
    const config = [
        {
            name: "School",
            render: (school) => <td className="px-4 py-2 border">{school}</td>,
            header: () => <TableHeader title="School" />,
        },
        {
            name: "Degree",
            render: (degree) => <td className="px-4 py-2 border">{degree}</td>,
            header: () => <TableHeader title="Degree" />,
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
                        {/* <TrashIcon className="w-5 h-5" /> */}
                        <FaTrash />
                    </button>
                </td>
            ),
            header: () => <TableHeader title="Actions" />,
        },
    ];

    const data = education.map(({ school, degree, from, to, id }) => {
        return [school, degree, { from, to }, id];
    });

    if (data.length === 0) {
        return null;
    }

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

export default Education;
