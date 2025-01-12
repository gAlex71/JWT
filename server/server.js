const express = require('express');
// const jsonServer = require('json-server');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/router');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', router);

// Create a JSON Server instance
// const jsonServerInstance = jsonServer.create();
// Specify the path to the db.json file
// jsonServerInstance.use(jsonServer.defaults());
// jsonServerInstance.use(jsonServer.router('db.json'));

const start = () => {
	try {
		app.listen(PORT, () => console.log(`Start on PORT-${PORT}`));

		// Connect the JSON Server to your Express backend
		// app.use('/api', jsonServerInstance);

		// Define a route to write a token to the db.json file
		// app.post('/api/token', (req, res) => {
		// 	const token = req.body.token;
		// 	jsonServerInstance.db.get('token').push(token);
		// 	jsonServerInstance.db.write();
		// 	res.json({ message: 'Token written successfully' });
		// });

		// Define a route to get the token from the db.json file
		// app.get('/api/token', (req, res) => {
		// 	const token = jsonServerInstance.db.get('token')[0];
		// 	if (token) {
		// 		res.json({ token });
		// 	} else {
		// 		res.status(404).json({ error: 'Token not found' });
		// 	}
		// });
	} catch (error) {
		console.log(error);
	}
};

start();
