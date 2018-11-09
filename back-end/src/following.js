
// function getFollowing for endpoint GET '/following/:user?'
const getFollowing = (req, res) => {

}

// function addFollowing for endpoint PUT '/following/:user'
const addFollowing = (req, res) => {

}

// function deleteFollowing for endpoint DELETE '/following/:user'
const deleteFollowing = (req, res) => {

}

module.exports = (app) => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', addFollowing)
	app.delete('/following/:user', deleteFollowing)
}