const express = require('express');
require('dotenv').config();
const db = require('./config/database');
const app = express();

app.use(express.json({ extended: false })); // for request.body

app.get('/', (req, res) => {
	try {
		res.status(200).json({ message: `API running` });
	} catch (error) {
		res.status(500).send(`Something wen't wrong. ${error.message}`);
	}
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/countries', require('./routes/api/countries'));
app.use('/api/lang', require('./routes/api/lang'));
app.use('/api/list', require('./routes/api/listconfig'));
app.use('/api/config', require('./routes/api/saveconfig'));

const PORT = process.env.PORT || 5000;

db.authenticate()
	.then(() => {
		console.log('Database connected...');
	})
	.catch((error) => console.log('Error: ' + error));

app.listen(PORT, () => {
	try {
		console.log(`Server started on port: ${PORT}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
});
