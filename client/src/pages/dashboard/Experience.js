import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteExperience } from '../../slices/profiles';

// class Experience extends Component {
	// renderExperience() {
	// 	// render the elements of this.props.education => array
	// 	if (!this.props.experience) {
	// 		return null;
	// 	}
	// 	const renderExp = this.props.experience.map(({ title, company, from, to, _id }) => {
	// 		return (
	// 			<tr>
	// 				<td className="hide-sm">{company}</td>
	// 				<td>{title}</td>
	// 				<td className="hide-sm">
	// 					{from} - {to || 'current'}
	// 				</td>

	// 				<td>
	// 					<button className="btn btn-danger" onClick={() => this.props.deleteExperience(_id)}>
	// 						{' '}
	// 						Delete
	// 					</button>
	// 				</td>
	// 			</tr>
	// 		);
	// 	});

	// 	return renderExp;
	// }
// 	render() {
		// return (
		// 	<div>
		// 		<table className="table">
		// 			<thead>
		// 				<tr>
		// 					<th>Company</th>
		// 					<th class="hide-sm">Title</th>
		// 					<th class="hide-sm">Years</th>
		// 					<th />
		// 				</tr>
		// 			</thead>
		// 			{this.renderExperience()}
		// 		</table>
		// 	</div>
		// );
// 	}
// }


export const Experience = ({
	experience,
	onDelete
}) => {
	const renderExperience = () => {
		if (!experience) {
			return null;
		}
		const renderExp = experience.map(({ title, company, from, to, _id }) => {
			return (
				<tr>
					<td className="hide-sm">{company}</td>
					<td>{title}</td>
					<td className="hide-sm">
						{from} - {to || 'current'}
					</td>

					<td>
						<button className="btn btn-danger" onClick={() => onDelete(_id)}>
							{' '}
							Delete
						</button>
					</td>
				</tr>
			);
		});

		return renderExp;
	}
	return (
		<div>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th class="hide-sm">Title</th>
						<th class="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				{renderExperience()}
			</table>
		</div>
	);
}


export default Experience;
