const config = require('config');

const { Pool, Client } = require('pg');
// const pool = new Pool({
// 	user: '',
// 	password: '',
// 	host: '',
// 	port: '',
// 	database: '',
// });

//const pool = new Pool(config.get('pool'));
const client = new Client({
	connectionString: config.get('connectionString'),
});

const connectDB = async () => {
	try {
		// await connect
		await client.connect();
		console.log('Postgress connected...');
	} catch (error) {
		console.error(error.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
