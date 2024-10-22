import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// fetchMyProfile()
import { fetchMyProfile, deleteEducation } from '../../slices/profiles';

class Education extends Component {
	componentDidMount() {
		// this.props.fetchMyProfile();
	}

	renderEducation = () => {
		// render the elements of this.props.education => array

		console.log(this.props.education);
		if (!this.props.education) {
			return null;
		}

		const renderEdu = this.props.education.map(({ school, degree, from, to, _id }) => {
			return (
				<tr>
					<td>{school}</td>
					<td className="hide-sm">{degree}</td>
					<td className="hide-sm">
						{from} - {to ? to : 'current'}
					</td>
					<td>
						<button className="btn btn-danger" onClick={() => this.props.deleteEducation(_id)}>
							Delete
						</button>
					</td>
				</tr>
			);
		});

		console.log(renderEdu);
		return renderEdu;
	};

	render() {
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
					{this.renderEducation()}
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { education } = state.profile.profile;
	console.log(education);
	return { education };
};
export default connect(mapStateToProps, { deleteEducation })(Education);
// no id is being provided in this context
