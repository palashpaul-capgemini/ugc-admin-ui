const express = require('express');

const app = express();

app.get('/', (req, res) => {
	try {
		res.send(`API running`);
	} catch (error) {
		res.status(500).send(`Something wen't wrong. ${error.message}`);
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	try {
		console.log(`Server started on port: ${PORT}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
});
