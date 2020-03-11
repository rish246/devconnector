const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
console.log(db);
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			dbName: 'DevConnector',
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error('error message', err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
