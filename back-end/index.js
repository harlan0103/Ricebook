const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// enableCORS
const enableCORS = (req, res, next) => {
    res.header('Access-Control-Allow-Origin',req.headers.origin)
    res.header('Access-Control-Allow-Credentials',true)
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE')
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header('Access-Control-Expose-Headers', 'Location, X-Session-Id')
    if(req.method === 'OPTIONS') {
        res.status(200).send("OK")
    } else {
        next()
    }
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(enableCORS)
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', hello)

// Add all endpoints
require('./src/auth.js')(app)
require('./src/profile.js')(app)
require('./src/articles.js')(app)
require('./src/following.js')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    const addr = server.address()
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
})