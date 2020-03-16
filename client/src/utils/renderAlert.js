import React from 'react';
const renderAlert = (alert) => {
	if (!alert) {
		return null;
	}
	const renderAlert = alert.map(({ msg, alertType, id }) => {
		console.log(alertType);
		return (
			<div key={id}>
				<h2 className={`alert-${alertType}`}>{msg}</h2>
			</div>
		);
	});
	return renderAlert;
};

export default renderAlert;
