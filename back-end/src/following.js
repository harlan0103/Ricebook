const Profile = require('./model.js').Profile
const User = require('./model.js').User
/* 
Function getFollowing for endpoint GET '/following/:user?'
Get following list of current user
*/
const getFollowing = (req, res) => {
	var currentUser = req.params.user? req.params.user : req.user.username
	// Find currentUser in database
	Profile.find({username: currentUser}).exec(function(err, userObj){
		if(err){
			res.send("No such user")
			return
		}
		else{
			// Send the following list of curent user
			var followingList = userObj[0].following
			// Find all following user information
			Profile.find({username: {$in : followingList}}).exec(function(err, userObj){
				var returnList = []
				for(var i = 0; i < userObj.length; i++){
					// Add current followed user detail to the result list
					returnList.push({username: userObj[i].username,
						headline: userObj[i].headline,
						avatar: userObj[i].avatar
					})
				}
				// Return the list
				res.send({following: returnList})
			})
		}
	})
}

/* 
Function addFollowing for endpoint PUT '/following/:user'
add user to the following list of current user
*/
const addFollowing = (req, res) => {
	var currentUser = req.user.username
	var addUser = req.params.user
	if(!addUser){
		res.status(500).send("No body provided")
		return
	}
	// Find current user in database
	User.find({username: addUser}).exec(function(err, userObj){
		if(userObj.length == 0){
			res.send({result: "Invalid user"})
			return
		}
		else{
			Profile.find({username: currentUser}).exec(function(err, userObj){
				if(!userObj){
					res.send("No such add user")
					return
				}
				else{
					// Find add user in database
					var followingList = userObj[0].following
					// Check if following list has already contains the add user
					if(followingList.indexOf(addUser) != -1){
						res.send({result: "Dupliacte"})
						return
					}
					else{
						// Update user followingl list
						followingList.push(addUser)
						Profile.update({username: currentUser}, {following: followingList}, function(err){
							if(err){
								res.send({err: err})
								return
							}
							else{
								// Send the added user name
								res.send({username: currentUser, following: followingList})
							}
						})
					}
				}
			})
		}
	})
}

/* 
Function deleteFollowing for endpoint DELETE '/following/:user'
Delete specific user from user following list
*/
const deleteFollowing = (req, res) => {
	// Get current logged in user
	var currentUser = req.user.username
	// Get delete user
	var deleteUser = req.params.user
	if(!deleteUser){
		res.status(500).send("No body provided")
		return
	}
	// First find delete user in Profile
	Profile.find({username: deleteUser}).exec(function(err, userObj){
		if(!userObj){
			res.send("No such user")
			return
		}
		else{
			// Delete user exist in database
			// Then get current user object from Profile
			Profile.find({username: currentUser}).exec(function(err, userObj){
				var followingList = userObj[0].following
				// If followingList does not contains delete user
				if(followingList.indexOf(deleteUser) == -1){	
					res.send("User is not in list")
					return
				}
				else{
					// Create new list
					var newList = []
					// Add user id into following list withoud delete user
					for(var i = 0; i < followingList.length; i++){
						if(deleteUser != followingList[i]){
							newList.push(followingList[i])
						}
					}
					// Update Profile
					Profile.update({username: currentUser}, {following: newList}, function(err){
						if(err){
							res.send("somthing wrong")
							return
						}
						else{
							// Send list updated message
							res.send({username: currentUser, following: newList})
						}
					})
				}
			})
		}
	})
}

module.exports = (app) => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', addFollowing)
	app.delete('/following/:user', deleteFollowing)
}