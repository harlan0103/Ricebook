const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// enableCORS
const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers','Authorization, Content-Type, X-Request-With, X-Session-Id')
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    if(req.method === 'OPTIONS') {
    	res.status(200).send("OK")
    } else {
    	next()
    }
}


// Response "hello world" send to server
const hello = (req, res) => res.send("hello world")

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(enableCORS)

// Create a end point '/' to call hello method
app.get('/', hello)

// Add all endpoints
require('./src/auth.js')(app)
require('./src/profile.js')(app)
require('./src/articles.js')(app)
require('./src/following.js')(app)

// add this to index.js
// Loading module
// It will be loaded first on startup
if(process.env.NODE_ENV !== "production"){
	require('dot-env')
}

// Initialize the localhost:3000 port
const port = process.env.Port || 3000
const server = app.listen(port, ()=> {
	const address = server.address();
	console.log(`server listening at http://${address.address}:${address.port}`);
});
