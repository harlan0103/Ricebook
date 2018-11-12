const md5 = require('md5')
const cookieParser = require('cookie-parser')
const User = require('./model.js').User
const Profile = require('./model.js').Profile

/////////////////////////////////////////////////
///////// Test data for stub endpoint ///////////
const testUser = [
	{
		username: "testUser1",
		password: "pwd"
	}
]
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// function userLogin for endpoint POST '/login'
const sessionUser = {}
const cookieKey = 'sid'
const mySecretMessage = "secretMessage"
const userLogin = (req, res) => {
	// Get entered username and password
	var usr = req.body.username
	var pwd = req.body.password

	// Validation for user input
	if(!usr || !pwd){
		res.status(400).send("Username or password is not valid")
		return 
	}
	else{
		// Get the record from the database by username
		User.find({username: usr}).exec(function(err, existUser){
			if(existUser.length == 0){
				//res.status(400).send("No such user")
				res.send({result: "INVALID"})
				return
			}
			else{
				// Compute the hash from the user's password and compare with the hash from the record
				var recordSalt = existUser[0].salt
				var recordHash = existUser[0].hash
				//var pwdHash = crypto.createHash('md5').update(pwd + ":" + recordSalt).digest("hex")
				var pwdHash = md5(pwd + ":" + recordSalt)
				if(pwdHash != recordHash){
					// Password not match the record
					//res.status(400).send("Password not match")
					res.send({result: "WRONGPASSWORD"})
				}
				else{
					console.log(usr + " is logged In")
					// Create a session for the user
					var sessionKey = md5(mySecretMessage + new Date().getTime() + usr)
					sessionUser[sessionKey] = existUser[0]
					// Session id is stored as httpOnly cookie
					res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
					console.log(res.cookies)
					res.send({username: usr, result: "success"})
				}
			}
		})
	}
}

// isLoggedIn function grab cookie from the request
const isLoggedIn = (req, res, next) => {
	// req.cookies[cookieKey] = sessionKey
	// sessionUser[req.cookies[cookieKey]] = logged in userObject
	var sid = req.cookies[cookieKey]
	console.log("cookie in isLoggedIn " + req.cookies[cookieKey])
	if(!sid){
		return res.sendStatus(401)
	}
	// userObj is the current logged in user object
	var userObj = sessionUser[sid]
	if(userObj){
		req.user = userObj
		next()
	} else {
		res.send("No userObj")
	}
}

// function userLogout for endpoint PUT '/logout'
const userLogout = (req, res) => {
	//req.cookies[cookieKey] is the sessionKey
	//sessionUser[req.cookies[cookieKey]] is the current logged in userObject
	console.log("Log out session" + req.cookies[cookieKey])
	res.clearCookie(cookieKey)
	delete sessionUser[req.cookies[cookieKey]]
	res.send({username: req.user.username, status: "success log out"})
}

// function userRegist for endpoint POST '/register'
const userRegist = (req, res) => {
	// Get new regist user information
	var username = req.body.username
	var password = req.body.password
	var headline = "Welcome to ricebook!"	// Default status message
	var following = []	// Empty list of user following
	var email = req.body.email
	var dob = req.body.dob
	var zipcode = req.body.zipcode
	var avatar = "";	// No picture
	console.log("register")
	// Check if all input information are valid
	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send("Information is not valid")
		return
	}
	else{
		// Check if username is already been taken
		User.find({username: username}).exec(function(err, existUser){
			if(existUser.length > 0){
				res.send({result: "user exist"})
				return
			}
			else{
				// Generate salt value, which is the combination of the user's username and the current time
				var timeStamp = new Date().getTime()
				var salt = username + timeStamp

				// Create hash for password plus salt
				//var hash = crypto.createHash('md5').update(password + ":" + salt).digest("hex")
				var hash = md5(password + ":" + salt)
				console.log(hash)

				// Insert new User into database
				new User({username: username, salt: salt, hash: hash}).save(function(err){
					if(err) res.status(500).send("Error")
				})

				// Insert new Profile into database
				new Profile({username: username, headline: headline, following: following, email: email, dob: dob, zipcode: zipcode, avatar: avatar}).save(function(err){
					if(err) res.status(500).send("Error")
				})

				// Send success message after data inserted
				res.send({status: "success", username: username})
			}
		})
	}
}

///////////////////////////////////////////////
//////////   		STUB         //////////////
///////////////////////////////////////////////

/*
function changePwd for endpoint PUT '/password'
STUB for '/password'
*/
const changePwd = (req, res) => {
	var currentUser = testUser[0].username
	var newPwd = req.body.password
	if(!newPwd){
		res.status(500).send("No password entered")
		return
	}
	var userObj = testUser.find(c => c.username === currentUser)
	if(!userObj){
		res.status(500).send("No such user object")
		return
	}
	else{
		userObj.password = newPwd
		res.send({username: currentUser, password: newPwd, result: "success"})
	}
}
///////////////////////////////////////////////

module.exports = (app) => {
	app.post('/register', userRegist)
	app.post('/login', userLogin)
	app.use(isLoggedIn)
	app.put('/logout', isLoggedIn, userLogout)
	app.put('/password', changePwd)
}