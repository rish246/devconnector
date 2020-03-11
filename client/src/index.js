import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	return <div>Hello React App</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));

// lets install concurrently to run both node and dev server all at once
