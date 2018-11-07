// This is profile.js which contains all user profile
// Information except passwords which is in auth.js

// Dummy date for testing
const profile = [
	{
		username: "harlan0103",
		headline: "This is the headline",
		email: "test@rice.edu",
		zipcode: 12345,
		dob: "1996-01-03",
		avater: "https://someaddress"
	},

	{
		username: "CrazMusic",
		headline: "test headline for CrazMusic",
		email: "test1@rice.edu",
		zipcode: 12345,
		dob: "1996-01-03",
		avater: "hard code avater for CrazMusic"
	},

	{
		username: "ExpressPanda",
		headline: "test headline for ExpressPanda",
		email: "test1@rice.edu",
		zipcode: 12345,
		dob: "1996-01-03",
		avater: "hard code avater for ExpressPanda"
	},

	{
		username: "Ecophobia",
		headline: "test headline for Ecophobia",
		email: "test1@rice.edu",
		zipcode: 12345,
		dob: "1996-01-03",
		avater: "hard code avater for Ecophobia"
	}
]

// function getHeadline for endpoint '/headline/:user?'
const getHeadline = (req, res) => {
	var user = req.params.user;
	var currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	res.send(currentUser.headline)
}

// function getHeadlines for endpoint '/headlines/:users?'
const getHeadlines = (req, res) => {
	// Get /headlines/:users? params and use & to saperate users
	var users = req.params.users ? req.params.users.split('&') : [req.username]
	console.log(users)
	// Create a return array for headlines
	var headlineArray = []
	users.forEach(function(user){
		console.log(user)
		var currentUser = profile.find(c => c.username === user)
		if(currentUser) headlineArray.push({username: user, headline: currentUser.headline})
	})

	res.send(headlineArray)
}

// function getEmail for endpoint '/email/:user?'
const getEmail = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		req.user = "harlan0103"
	}
	// Check if entered user is exist
	const currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	res.send(currentUser.email)
}

// function getDob for endpoint '/dob/:users?'
const getDob = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		req.user = "harlan0103"
	}
	// Check if entered user is exist
	const currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	// Send a JSON format
	res.send({dob: currentUser.dob})
}

// function getZipcode for endpoint '/zipcode/:users?'
const getZipcode = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		req.user = "harlan0103"
	}
	// Check if entered user is exist
	const currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	// Send a JSON format
	res.send({zipcode: currentUser.zipcode})
}

// function getAvatars for endpoint '/avatars/:users?'


module.exports = (app) => {
	app.get('/headline/:user', getHeadline)
	app.get('/headlines/:users?', getHeadlines)
	app.get('/email/:user?', getEmail)

	app.get('/dob/:user?', getDob)

	app.get('/zipcode/:users?', getZipcode)
}