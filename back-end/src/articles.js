const md5 = require('md5')
const Post = require('./model.js').Post
const Comment = require('./model.js').Comment
const Profile = require('./model.js').Profile
const User = require('./model.js').User
const uploadImage = require('./uploadCloudinary.js').uploadImage

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
			// Find user profile
			Profile.find({username: currentUser}).exec(function(err, userObj){
				if(!userObj){
					res.send("No such user")
					return
				}
				else{
					// Find user profile then get the following list
					var userProfile = userObj[0]
					// Get a users to query list
					var usersToQuery = [ userProfile.username, ...userProfile.following]
					// Query the most recent 10 posts of current user
					// The $in operator selects the documents where the value of a field equals any value in the specified array.
					Post.find({author: {$in: usersToQuery}}).limit(10).sort({date: -1}).exec(function(err, postObj){
						if(err){
							res.send("err")
							return
						}
						else{
							res.send({posts: postObj})	
						}
					})
				}
			})
			// Find user articles in Post schema
			/*
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
			*/
		}
	}
	else{
		// With id param
		var id = req.params.id
		Post.find({id: id}).exec(function(err, post){
			if(!post || post.length == 0){
				res.status(500).send("No articles with this Id")
			}
			else{
				res.send(post)
			}
		})
	}
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
		var body = req.body.text
		var picture = req.body.image
		var comment = []

		if(!body){
			return res.send({err: "miss content"})
		}
		else{
			Post.find({author: currentUser}).exec(function(err, posts){
				// Use postNum to indicate the post number of current user
				var postNum = (posts.length == 0) ? 1 : posts.length + 1
				// Use mad5 to generate unique id number for each post
				var id = md5(currentUser + postNum + date)
				// Add new post to the Post schema
				new Post({postNum: postNum, id: id, author: currentUser, body: body, date: date, picture: picture, comment: comment}).save(function(err, article){
					if(err) return res.status(500).send(err)
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

/* 
Function putArticles for endpoint PUT '/articles/:id'
id is post id
req body {text: message, commentId: optional}
commentId not supplied update the article of id
commentId is supplied update the comment
commentId is -1 then add new comment
*/
const putArticles = (req, res) => {
	// Get current user
	var currentUser = req.user.username
	// Get article id
	var postId = req.params.id
	// Get update message
	var message = req.body.text
	// Get comment id
	var commentId = req.body.commentId
	
	// First find the post
	if(!postId){
		res.send("No post provided")
		return
	}
	else{
		// Find the post in post database
		Post.find({id: postId}).exec(function(err, postObj){
			if(postObj.length == 0){
				res.send({result: "Invalid postId"})
				return
			}
			else{
				// If no comment id provided update the post body
				if(commentId == null){
					// Check if current user own the post
					if(postObj[0].author != currentUser){
						res.send("You don't own this post")
						return
					}
					else{
						// User own this post then update body
						var date = new Date()
						Post.update({id: postId}, {body: message}, {date: date}, function(err){
							if(err){
								res.send("err")
								return
							}
							else{
								// Send post update message
								res.send({username: currentUser, postId: postId, body: message})
							}
						})
					}
				}
				// Provided comment id is "-1"
				else if(commentId == "-1"){
					var commentAuthor = currentUser
					var date = new Date()
					// Use md5 to create a unique comment id
					var newCommentId = md5(commentAuthor + date)
					// Store new comment into database
					var commentObj = new Comment({commentId: newCommentId, author: currentUser, body: message, date: date})
					commentObj.save(function(err, comment){
						if(err){
							res.send("err")
							return
						}
					})
					// Then add comment to the comment list
					var commentList = postObj[0].comments
					commentList.push(commentObj)
					console.log(commentList)
					// Update the post list
					Post.update({id: postId}, {comments: commentList}, function(err){
						if(err){
							res.send("err")
							return
						}
						else{
							res.send({status: "success"})
						}
					})
				}
				// Provided comment id
				else{
					var commentAuthor = currentUser
					Comment.find({commentId: commentId}).exec(function(err, commentObj){
						if(!commentObj){
							res.send("No such comment")
						}
						else{
							// If currentUser own this comment then update
							if(commentObj[0].author != commentAuthor){
								res.send("You dont own this comment")
							}
							else{
								// Update comment schema in database
								Comment.update({commentId: commentId}, {body: message}, {date: new Date()}, function(err){
									if(err){
										res.send("err")
										return
									}
								})
								// Then update to post list
								var commentList = postObj[0].comments
								for(var i = 0; i < commentList.length; i++){
									if(commentList[i].commentId == commentId){
										commentList[i].body = message
										commentList[i].date = new Date()
									}
								}
								// Update to Post
								Post.update({id: postId}, {comments: commentList}, function(err){
									if(err){
										res.send("err")
										return
									}
									else{
										res.send({status: "success"})
									}
								})
							}
						}
					})
				}
			}
		})
	}
}

/*
Function to upload imgae for user post
*/
const upload = (req, res) => {
	// Get uploaded image
	var image = req.fileurl
	res.send({image: image})
}

module.exports = (app) => {
	app.get('/articles/:id?', getArticles)
	app.put('/articles/:id', putArticles)
	app.post('/article', postNewArticle)
	app.put('/image', uploadImage('image'), upload)
}