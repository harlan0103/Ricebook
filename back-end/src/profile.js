// This is profile.js which contains all user profile
// Information except passwords which is in auth.js
const Profile = require('./model.js').Profile

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

/* 
function getEmail for endpoint '/email/:user?'
Get email address of specific user
*/
const getEmail = (req, res) => {
	// Get params 
	var user = req.params.user ? req.params.user.split(',') : [req.user.username]
	Profile.find({username: user}).exec(function(err, userObj){
		if(!userObj){
			res.send("No such user")
			return
		}
		else{
			var userEmail = userObj[0].email
			// Send the email
			res.send({username: user, email: userEmail})
		}
	})
}

/* 
function putEmail for endpoint '/email'
User is able to change their email address
*/
const putEmail = (req, res) => {
	// Get logged in user
	var currentUser = req.user.username
	// Get new email address
	var email = req.body.email
	if(!email) {
		res.status(400).send("Not provide email address");
	}
	else{
		Profile.update({username: currentUser}, {email: email}, function(err){
			if(err){
				res.send("error occurs")
				return
			}
			else{
				res.send({username:currentUser, email: email})
			}
		})
	}
}

/* 
function getDob for endpoint '/dob/:users?'
Get specific user date of birth
*/
const getDob = (req, res) => {
	// Get params 
	var user = req.params.user ? req.params.user.split(',') : [req.user.username]
	Profile.find({username: user}).exec(function(err, userObj){
		if(err){
			res.send("No such user")
			return
		}
		else{
			var userDob = userObj[0].dob
			// Send the dob
			res.send({username: user, dob: userDob})
		}
	})
}

/* 
function getZipcode for endpoint '/zipcode/:users?'
Get specific user zipcode
*/
const getZipcode = (req, res) => {
	// Get params 
	var user = req.params.user ? req.params.user.split(',') : [req.user.username]
	Profile.find({username: user}).exec(function(err, userObj){
		if(err){
			res.send("No such user")
			return
		}
		else{
			var userZipcode = userObj[0].zipcode
			// Send the zipcode
			res.send({username: user, zipcode: userZipcode})
		}
	})
}

/* 
function putZipcode for endpoint PUT '/zipcode'
Update user zipcode
*/
const putZipcode = (req, res) => {
	// Get logged in user
	var currentUser = req.user.username
	// Get new zipcode
	var zipcode = req.body.zipcode
	if(!zipcode) {
		res.status(400).send("Not provide zipcode");
	}
	else{
		Profile.update({username: currentUser}, {zipcode: zipcode}, function(err){
			if(err){
				res.send("error occurs")
				return
			}
			else{
				res.send({username:currentUser, zipcode: zipcode})
			}
		})
	}
}

/* 
function getAvatars for endpoint '/avatars/:users?'
Get users avatar from database and return a avatar list
*/
const getAvatars = (req, res) => {
	// Get /avatars/:users? params and use ','' to split users
	var users = req.params.users ? req.params.users.split(',') : [req.user.username]
	// Create return array for avatars
	var avatarsArray = []
	// For each input username find its user object in Profile schema
	Profile.find({username: users}).exec(function(err, userObj){
		if(!userObj || userObj.length != users.length){
			return res.status(500).send("No such User")
		}
		else{
			// For each user object push the username and avatar into avatarsArray
			userObj.forEach(function(user){
				avatarsArray.push({username: user.username, avatar: user.avatar})
			})
			res.send({avatars: avatarsArray})
		}
	})
}

///////////////////////////////////////////////
//////////   		STUB         //////////////
///////////////////////////////////////////////
// function putAvatar for endpoint PUT '/avatar'
const putAvatar = (req, res) => {
	// Get new avatar
	// Should be a image file?
	var avatar = req.body.avatar
	if(!avatar) res.status(400).send("Not provide avatar");
	res.send({username: "dummy", avatar: avatar})
}
///////////////////////////////////////////////

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