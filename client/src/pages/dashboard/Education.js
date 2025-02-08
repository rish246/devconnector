import React from 'react';

export const Education = ({
	education,
	onDelete
}) => {
	const renderEducation = () => {
		if (!education) {
			return null;
		}

		return education.map(({ school, degree, from, to, _id }) => {
			return (
				<tr>
					<td>{school}</td>
					<td className="hide-sm">{degree}</td>
					<td className="hide-sm">
						{from} - {to ? to : 'current'}
					</td>
					<td>
						<button className="btn btn-danger" onClick={() => onDelete(_id)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});

	};


	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th class="hide-sm">Degree</th>
						<th class="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				{renderEducation()}
			</table>
		</div>
	);
}

export default Education;