const express = require('express');

//we are going to use express to create the api
const app = express();

//make the port number
app.get('/', (req, res) => {
	res.send('API up and running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening at PORT: ${5000}`));
