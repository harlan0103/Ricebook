const Post = require('./model.js').Post
const Comment = require('./model.js').Comment
/*
Function getArticles for endpoint GET '/articles.:id?'
GET /articles Return at least 5 articles if test user is logged in user
GET /articles/id Where id is valid or invalid article id
*/
const getArticles = (req, res) => {
	if(!req.params.id){
		var currentUser = req.user.username
		var postList = []
		// Check if user is logged in
		if(!currentUser){
			res.status(500).send("No user logged in")
		}
		else{
			// Find user articles in Post schema
			Post.find({author: currentUser}).exec(function(err, userPost){
				if(!userPost){
					res.status(500).send("No articles for user")
				}
				else{
					for(var i = 0; i < userPost.length; i++){
						postList.push(userPost[i])
					}
					res.send({posts: postList})
				}
			})
		}
	}
	else{
		var id = req.params.id
		res.send(id)
	}
}

// function putArticles for endpoint PUT '/articles/:id'
const putArticles = (req, res) => {

}

/* 
Function postNewArticle for endpoint POST '/article'
Adding an article for logged in user 
Return list of articles with new article
Validate list increased by one and contents of the new article
*/
const postNewArticle = (req, res) => {
	// Get current logged in user
	var currentUser = req.user.username
	if(!currentUser){
		return res.status(500).send("No user logged In")
	}
	else{
		var author = currentUser
		var date = new Date()
		var body = req.body.article
		var picture = req.body.picture
		var comment = []

		if(!body){
			return res.status(400).send("Miss post information")
		}
		else{
			Post.find({author: currentUser}).exec(function(err, posts){
				var id = (posts.length == 0) ? 1 : posts.length + 1
				// Add new post to the Post schema
				new Post({id: id, author: currentUser, body: body, date: date, picture: picture, comment: comment}).save(function(err, article){
					if(err) return res.status(500).send("Error")
					// After insert return a list of posts of current user
					var postList = []
					Post.find({author: currentUser}).exec(function(err, posts){
						for(var i = 0; i < posts.length; i++){
							postList.push(posts[i])
						}
						res.send({posts: postList})
					})
				})
			})
		}
	}
}

module.exports = (app) => {
	app.get('/articles/:id?', getArticles)
	app.put('/articles/:id', putArticles)
	app.post('/article', postNewArticle)
}