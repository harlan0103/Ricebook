const Profile = require('./model.js').Profile

/////////////////////////////////////////////////
///////// Test data for stub endpoint ///////////
const testProfile = [
	{
		username: "dummyUser",
		headline: "This is the headline",
		following: ["ts1", "ts2", "ts3", "ts4", "ts5"],
		email: "test@rice.edu",
		zipcode: 12345,
		dob: "1999-09-19",
		avater: "https://someaddress"
	}
]
/////////////////////////////////////////////////
/////////////////////////////////////////////////


///////////////////////////////////////////////
//////////   		STUB         //////////////
///////////////////////////////////////////////

/* 
Function getFollowing for endpoint GET '/following/:user?'
*/
const getFollowing = (req, res) => {
	var currentUser = req.params.user? req.params.user : testProfile[0].username
	var userObj = testProfile.find(c => c.username === currentUser)
	if(!userObj){
		res.status(500).send("No such user")
		return
	}
	else{
		var followingList = userObj.following
		res.send({username: currentUser, following: followingList})
	}
}

/* 
Function addFollowing for endpoint PUT '/following/:user'
*/
const addFollowing = (req, res) => {
	var currentUser = req.params.user? req.params.user : testProfile[0].username
	var addUser = req.body.username
	if(!addUser){
		res.status(500).send("No body provided")
		return
	}
	var userObj = testProfile.find(c => c.username === currentUser)
	if(!userObj){
		res.status(500).send("No such user")
		return
	}
	else{
		var followingList = userObj.following
		followingList.push(addUser)
		res.send({username: currentUser, following: followingList})
	}
}

/* 
Function deleteFollowing for endpoint DELETE '/following/:user'
*/
const deleteFollowing = (req, res) => {
	var currentUser = testProfile[0].username
	var deleteUser = req.params.user
	if(!deleteUser){
		res.status(500).send("No body provided")
		return
	}
	var userObj = testProfile.find(c => c.username === currentUser)
	if(!userObj){
		res.status(500).send("No such user")
		return
	}
	else{
		var followingList = userObj.following
		var newList = []
		for(var i = 0; i < followingList.length; i++){
			if(deleteUser != followingList[i]){
				newList.push(followingList[i])
			}
		}
		res.send({username: currentUser, following: newList})
	}
}
///////////////////////////////////////////////

module.exports = (app) => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', addFollowing)
	app.delete('/following/:user', deleteFollowing)
}