const md5 = require('md5')
const cookieParser = require('cookie-parser')
const User = require('./model.js').User
const Post = require('./model.js').Post
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
// Third party login
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
// Use cookie session to control session
const cookieSession = require('cookie-session')
// Define the front-end main url
const frontEndMain = 'https://ricebook-hl74-final.surge.sh/#/main'

// Function userLogin for endpoint POST '/login'
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

// Third party login function
passport.use(
	new GoogleStrategy({
		// Options for the google strategy
		clientID: '275693790163-3gbolib2lms9nbriivvcpmm8bb7lbl6k.apps.googleusercontent.com',
		clientSecret: 'aDiSXZFf7ujjIrPFzxrN1Ae3',
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		// accessToken is token from google
		// Passport callback function
		//console.log(profile)
		var id = profile.id
		var displayname = profile.displayName
		var googleUsername = displayname+ '@' + profile.provider
		// Now we get the login information about the google user
		// We want to first check if user is in our database
		// Use authID to identify third-party login user
		User.find({authID: id}).exec(function(err, userObj){
			// We don't have user record for this google user
			if(userObj.length == 0){
				console.log("Create a new user")
				// Add new profile to database
				new Profile({
					username: googleUsername, 
					headline: "Google user", 
					following: [], 
					email: null, 
					dob: null, 
					phone: null, 
					zipcode: null, 
					avatar: profile.photos[0].value
				}).save(function(err, userProfile){
					if(err){
						console.log(err)
					}
				})
				// Add new user to database
				new User({
					username: googleUsername, 
					auth: "google",
					authID: id,
					status: ""
				}).save(function(err, newUser){
					if(err){
						console.log(err)
					}
				})
				var userObj = {
					username: googleUsername,
					auth: "google",
					authID: id
				}
				// Get saved user from database
				console.log(userObj)
				done(null, userObj)
			}
			// The google user is in out database
			else{
				console.log("User already in database")
				//console.log(userObj)
				// Go to next stage
				User.find({authID: id}).exec(function(err, userObj){
					done(null, userObj[0])
				})
			}
		})
	})
)

// Serialize user id
passport.serializeUser(function(user, done){
	console.log("here?")
	console.log(user)
	done(null, user.username)
})

// Deserialize user to get user id
// *** Not working
// *** Maybe due to localhost connection
passport.deserializeUser(function(id, done){
	console.log("Get ID: " + id)
	User.find({authID: id}).exec(function(err, userObj){
		if(err){
			console.log(err)
		}
		console.log(userObj)
		done(null, userObj[0])
	})
})

// Google call back function
const googleCallBack = (req, res) => {
	/*
	================================================================================================
	================================================================================================
	Cannot deserializeUser so use old session function to create and store session and cookie
	================================================================================================
	================================================================================================
	*/
	//console.log(req.isAuthenticated())
	//console.log(req.user)

	var sessionKey = md5(mySecretMessage + new Date().getTime() + req.user.username)
	sessionUser[sessionKey] = req.user
	// Session id is stored as httpOnly cookie
	res.cookie(cookieKey, sessionKey, {maxAge: 3600*1000, httpOnly: true})
	console.log(res.cookies)
	res.redirect(frontEndMain)
	/*
	================================================================================================
	================================================================================================
	*/
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
	var phone = req.body.phone
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
				new User({
					username: username, 
					salt: salt, 
					hash: hash,
					auth: "",
					authID: "",
					status: ""
				}).save(function(err){
					if(err) res.status(500).send("Error")
				})

				// Insert new Profile into database
				new Profile({username: username, headline: headline, following: following, email: email, dob: dob, phone:phone, zipcode: zipcode, avatar: avatar}).save(function(err){
					if(err) res.status(500).send("Error")
				})

				// Send success message after data inserted
				res.send({status: "success", username: username})
			}
		})
	}
}

/*
function changePwd for endpoint PUT '/password'
Change current user password
*/
const changePwd = (req, res) => {
	// Get current user
	var currentUser = req.user.username
	// Get new pwd
	var newPwd = req.body.password
	if(!newPwd){
		res.status(500).send("No password entered")
		return
	}
	User.find({username: currentUser}).exec(function(err, userObj){
		if(err){
			res.send("No such user")
			return
		}
		else{
			// Find current logged in user profile and change its password
			// First get the salt value
			var salt = userObj[0].salt
			var newHash = md5(newPwd + ":" + salt)
			console.log(newHash)
			User.update({username: currentUser}, {hash: newHash}, function(err){
				if(err){
					res.send("something wrong")
					return
				}
				else{
					// Send change success message
					res.send({username: currentUser, status: "success"})
				}
			})
		}
	})
}

/*
A function to merge current logged in user(Third party) with a local account
*/
const mergeAccount = (req, res) => {
	// Get current user
	var currentUser = req.user.username
	// Get request local username and password
	var reqUser = req.body.username
	var reqPwd = req.body.pwd

	User.find({username: reqUser}).exec(function(err, userObj){
		// Request user is not in database
		if(userObj.length == 0){
			res.send({result: "INVALID"})
			return
		}
		else{
			// Check if request password is match
			// Compute the hash from the user's password and compare with the hash from the record
			var recordSalt = userObj[0].salt
			var recordHash = userObj[0].hash
			//var pwdHash = crypto.createHash('md5').update(pwd + ":" + recordSalt).digest("hex")
			var pwdHash = md5(reqPwd + ":" + recordSalt)
			// Password does not match
			if(pwdHash != recordHash){
				res.send({result: "WRONGPWD"})
				return
			}
			else{
				// Check if this account is a local account, not third-party account
				if(userObj[0].auth == "" && userObj[0].authID == "" && userObj[0].status == ""){
					// For third-party account
					// Set authID = ""
					// Get followingList[] and set following = []
					// Set all post author to local account
					// Set all comment author to local account
					console.log("currentUser: " + currentUser)
					//var googleID = "";
					var ThirdPartyFollowingList = [];

					User.find({username: currentUser}).exec(function(err, userObj){
						var googleID = userObj[0].authID
						console.log("This is authID: " + googleID)
						// Update local account information
						User.find({username: reqUser}).exec(function(err, localUser){
							console.log(localUser)
							// Update local account with new authID and linked status
							User.update({username: reqUser}, {authID: googleID}, function(err){})
							User.update({username: reqUser}, {auth: currentUser}, function(err){})
							User.update({username: reqUser}, {status: "linked"}, function(err){})
						})
						// Update third-party authID to ""
						User.update({username: currentUser}, {authID: ""}, function(err){})
					})

					// Get followingList and set following = []
					Profile.find({username: currentUser}).exec(function(err, userObj){
						ThirdPartyFollowingList = userObj[0].following
					})
					Profile.update({username: currentUser}, {following: []}, function(err){
						console.log("ser following")
					})
					// Set all post and comment to local account
					Post.update({author: currentUser}, {$set: {'author': reqUser}}, function(){})
					Post.update({'comments.author': currentUser}, {$set: {'comments.$.author': reqUser}}, function(){})
					Comment.update({author: currentUser}, {$set: {'author': reqUser}}, function(){})

					Profile.find({username: reqUser}).exec(function(err, userObj){
						var oldFollowing = userObj[0].following
						// Merge two list
						var newFollowing = oldFollowing.concat(ThirdPartyFollowingList)
						console.log("NEW FOLLOWING: " + newFollowing)
						Profile.update({username: reqUser}, {following: newFollowing}, function(){})
					})
					res.send({result: "SUCCESS"})
				}
				else{
					// This is a third-party or linked account
					res.send({result: "LINKED"})
					return
				}
			}
		}
	})

}

/*
Function to unlink a linked account
The local account will remain same except authID to be "" and status to be ""
The third-party will now get a authID
*/
const unlinkAccount = (req, res) => {
	var currentUser = req.user.username
	User.find({username: currentUser}).exec(function(err, userObj){
		var authName = userObj[0].auth
		var authID = userObj[0].authID
		// Update local user status
		User.update({username: currentUser}, {authID: ""}, function(){})
		User.update({username: currentUser}, {status: ""}, function(){})
		User.update({username: currentUser}, {auth: ""}, function(){})
		// Now find third-party user information and update
		User.update({username: authName}, {authID: authID}, function(){})
	})
	res.send({result: "success"})
}

module.exports = (app) => {
	//app.use(passport.initialize())
	// Third-party login
	app.use(passport.initialize())
	app.use(passport.session())
	app.get('/login/auth/google', passport.authenticate('google', {
		scope: ['profile']
	}))
	// Google callback
	app.get('/auth/google/callback', passport.authenticate('google'), googleCallBack)

	app.post('/register', userRegist)
	app.post('/login', userLogin)
	app.use(isLoggedIn)
	app.put('/logout', isLoggedIn, userLogout)
	app.put('/password', changePwd)
	app.put('/merge', mergeAccount)
	app.put('/unlink', unlinkAccount)
}