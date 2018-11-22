// this is model.js
var mongoose = require('mongoose')
require('./db.js')

// Create user schema
var userSchema = new mongoose.Schema({
	username: String,
	salt: String,
	hash: String
})

// Create profile schema
var profileSchema = new mongoose.Schema({
	username: String,
	//status: String,
	headline: String,
	following: [String],
	email: String,
	dob: String,
	zipcode: String,
	avatar: String
})

// Create comments schema
var commentSchema = new mongoose.Schema({
	commentId: String,
	author: String,
	body: String,
	date: Date
})

// Create posts schema
var postSchema = new mongoose.Schema({
	postNum: Number,
	id: String,
	author: String,
	body: String,
	date: Date,
	picture: String,
	comments: [ commentSchema ]
})



exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
exports.Post = mongoose.model('posts', postSchema)
exports.Comment = mongoose.model('comments', commentSchema)