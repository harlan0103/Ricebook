// this is dbarticle.js 
var Article = require('./model.js').Article
var Profile = require('./model.js').Profile
var User = require('./model.js').User
var Post = require('./model.js').Post
var Comment = require('./model.js').Comment

function find(req, res) {
     findByAuthor(req.params.user, function(items) {
          res.send({items})
     })
}

module.exports = (app) => {
     app.get('/find/:user', find)
}


function findByAuthor(author, callback) {
	Article.find({ author: author }).exec(function(err, items) {
		console.log('There are ' + items.length + ' entries for ' + author)
		var totalLength = 0
		items.forEach(function(article) {
			totalLength += article.text.length
		})
		console.log('average length', totalLength / items.length)		
		callback(items)
	})
}

//////////////////////////////
// remove these examples 
// Create test Profile
//new Profile({ username: "ts1", headline: "test headline for ts1", email: "test email for ts1", zipcode: "12345", dob: "1999-09-19", avatar: "https://ts1.png"}).save()
//new Profile({ username: "ts2", headline: "test headline for ts2", email: "test email for ts2", zipcode: "12345", dob: "1999-09-19", avatar: "https://ts2.png"}).save()
//new Profile({ username: "ts3", headline: "test headline for ts3", email: "test email for ts3", zipcode: "12345", dob: "1999-09-19", avatar: "https://ts3.png"}).save()
//new Profile({ username: "ts4", headline: "test headline for ts4", email: "test email for ts4", zipcode: "12345", dob: "1999-09-19", avatar: "https://ts4.png"}).save()
// Create test User
//new User({username: "ts1", salt: "abcdefg", hash: "1234abcd"}).save()
// Create test articles
new Post({id:1, author: "testuser2", body: "This is the test post 1", date: new Date().getTime(), picture: "", comment: []}).save()
//////////////////////////////
// remove the above example code
//////////////////////////////