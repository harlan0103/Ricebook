const express = require('express');
const app = express();
app.user(express.json());


const getEmail = (req, res) => {

}

const updateEmail = (req, res) => {

}

const getZipcode = (req, res) => {

}

const updateZipcode = (req, res) => {

}

const getAvatars = (req, res) => {

}

const updateAvatar = (req, res) => {
	
}

module.exports = (app) => {
	app.get('/email/:user?', getEmail)
	app.put('/email', updateEmail)
	app.get('/zipcode/:user?', getZipcode)
	app.put('/zipcode', updateZipcode)
	app.get('/avatars/:users?', getAvatars)
	app.put('/avatar', uploadImage('image'), updateAvatar)
}