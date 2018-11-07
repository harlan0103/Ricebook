const express = require('express')
const bodyParser = require('body-parser')

// Response "hello world" send to server
const hello = (req, res) => res.send("hello world")

const app = express()
app.use(bodyParser.json())

// Create a end point '/' to call hello method
app.get('/', hello)

require('./src/profile.js')(app)

// Initialize the localhost:3000 port
const port = process.env.Port || 3000
const server = app.listen(port, ()=> {
	const address = server.address();
	console.log(`server listening at http://${address.address}:${address.port}`);
});
