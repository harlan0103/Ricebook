// This is profile.js which contains all user profile
// Information except passwords which is in auth.js
const Profile = require('./model.js').Profile

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

/*
Function getHeadlines for endpoint '/headlines/:users?'
Return array with 1 element containing headline for logged in user
*/
const getHeadlines = (req, res) => {
	// Get /headlines/:users? params and use ','' to split users
	var users = req.params.users ? req.params.users.split(',') : [req.user.username]
	// Create return array for headlines
	var headlineArray = []
	// For each input username find its user object in Profile schema
	Profile.find({username: users}).exec(function(err, userObj){
		if(!userObj || userObj.length != users.length){
			return res.status(500).send("No such User")
		}
		else{
			// For each user object push the username and headline into headlineArray
			userObj.forEach(function(user){
				headlineArray.push({username: user.username, headline: user.headline})
			})
			res.send({headlines: headlineArray})
		}
	})
}

/*
Function putHeadline for endpoint '/headline'
Update logged in user headline
*/
const putHeadline = (req, res) => {
	// Get new current user and new headline
	var currentUser = req.user.username
	//console.log(username)
	var headline = req.body.headline
	if(!headline){
		return res.status(400).send("Not provide new headline")
	}
	else{
		console.log(headline)
		// Use update method to update headline in Profile schema
		Profile.update({username: currentUser}, {headline: headline}, function(err){
			if(err){
				res.status(500).send("updating error")
				return
			}
			else{
				res.send({username: currentUser, headline: headline})
			}
		})
	}
}

///////////////////////////////////////////////
//////////   		STUB         //////////////
///////////////////////////////////////////////

// function getEmail for endpoint '/email/:user?'
// Test Mongodb connection
const getEmail = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		req.user = "harlan0103"
	}
	// Use find() to find user information in the database
	Profile.find({username: user}).exec(function(err, currentUser){
		if(err){
			res.status(500).send("Error")
			return	
		}
		if(!currentUser){
			res.status(400).send("No such user")
			return
		} 
		res.send({username: user, email: currentUser[0].email})
	})


	//if(!currentUser) res.status(404).send('The user is not defined');
	//res.send({username: user, email: currentUser.email})
}

// function putEmail for endpoint '/email'
const putEmail = (req, res) => {
	// Get new email address
	var email = req.body.email
	if(!email) res.status(400).send("Not provide email");
	res.send({username: "dummy", email: email})
}

// function getDob for endpoint '/dob/:users?'
const getDob = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		// Set default user
		//** Should be the current logged in user
		req.user = "harlan0103"
	}
	// Check if entered user is exist
	const currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	// Response format {username: user, dob: milliseconds}
	res.send({username: user, dob: currentUser.dob})
}

// function getZipcode for endpoint '/zipcode/:users?'
const getZipcode = (req, res) => {
	// Get params
	var user = req.params.user
	if(!user){
		// Set default user
		//** Should be the current logged in user
		req.user = "harlan0103"
	}
	// Check if entered user is exist
	const currentUser = profile.find(c => c.username === user)
	if(!currentUser) res.status(404).send('The user is not defined');
	// Send a JSON format
	res.send({username: user, zipcode: currentUser.zipcode})
}

// function putZipcode for endpoint PUT '/zipcode'
const putZipcode = (req, res) => {
	// Get new zipcode
	var zipcode = req.body.zipcode
	if(!zipcode) res.status(400).send("Not provide zipcode");
	res.send({username: "dummy", zipcode: zipcode})
}

// function getAvatars for endpoint '/avatars/:users?'
const getAvatars = (req, res) => {
	// Get request username
	var users = req.params.users ? req.params.users.split(',') : [req.username]
	console.log(users)
	// Create a return array for headlines
	var AvatarArray = []
	users.forEach(function(user){
		console.log(user)
		var currentUser = profile.find(c => c.username === user)
		if(currentUser) AvatarArray.push({username: user, avatar: currentUser.avatar})
	})

	res.send({avatars: AvatarArray})
}

// function putAvatar for endpoint PUT '/avatar'
const putAvatar = (req, res) => {
	// Get new avatar
	// Should be a image file?
	var avatar = req.body.avatar
	if(!avatar) res.status(400).send("Not provide avatar");
	res.send({username: "dummy", avatar: avatar})
}

module.exports = (app) => {
	//app.get('/headline/:user', getHeadline)
	app.put('/headline', putHeadline)
	app.get('/headlines/:users?', getHeadlines)
	app.get('/email/:user?', getEmail)
	app.put('/email', putEmail)
	app.get('/dob/:user?', getDob)
	app.get('/zipcode/:user?', getZipcode)
	app.put('/zipcode', putZipcode)
	app.get('/avatars/:users?', getAvatars)
	app.put('/avatar', putAvatar)
}