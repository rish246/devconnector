import React from "react";
import Table from "../../components/Table";

// export const Education = ({
// 	education,
// 	onDelete
// }) => {
// 	const renderEducation = () => {
// 		if (!education) {
// 			return null;
// 		}

// 		return education.map(({ school, degree, from, to, _id }) => {
// 			return (
// 				<tr>
// 					<td>{school}</td>
// 					<td className="hide-sm">{degree}</td>
// <td className="hide-sm">
// 	{from} - {to ? to : 'current'}
// </td>
// 					<td>
// 						<button className="btn btn-danger" onClick={() => onDelete(_id)}>
// 							Delete
// 						</button>
// 					</td>
// 				</tr>
// 			);
// 		});

// 	};

// 	return (
// 		<div>
// 			<table className="table">
// 				<thead>
// 					<tr>
// 						<th>School</th>
// 						<th class="hide-sm">Degree</th>
// 						<th class="hide-sm">Years</th>
// 						<th />
// 					</tr>
// 				</thead>
// 				{renderEducation()}
// 			</table>
// 		</div>
// 	);
// }

export function Education({ education, onDelete }) {
    const config = [
        {
            name: "School",
            render: (school) => <td>{school}</td>,
            heading: () => <th className="hide-sm">School</th>,
        },
        {
            name: "Degree",
            render: (degree) => <td className="hide-sm">{degree}</td>,
            heading: () => <th className="hide-sm">Degree</th>,
        },
        {
            name: "Years",
            render: ({ from, to }) => (
                <td className="hide-sm">
                    {from} - {to ? to : "current"}
                </td>
            ),
            heading: () => <th className="hide-sm">Years</th>,
        },
    ];

    const data = education.map(({ school, degree, from }) => {
        const years = 3; // todo: fix this
        return [school, degree, years];
    });
    return <Table className="table" config={config} data={data} />;
}
export default Education;
