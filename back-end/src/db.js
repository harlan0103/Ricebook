var mongoose = require('mongoose')

// replace this "localhost" value with the one from heroku/mlab
//var url = 'mongodb://localhost:27017/webdev'
//var url = 'mongodb://ricebook:123rice@ds129762.mlab.com:29762/heroku_zht3cpvz'
// Test database
//var url = 'mongodb://testuser:123test@ds255403.mlab.com:55403/ricebook'

// Final mongodb address
var url = 'mongodb://ricebook:123rice@ds119523.mlab.com:19523/heroku_ntzbg5nf'

if (process.env.MONGOLAB_URI) {
	url = process.env.MONGOLAB_URI;
}

mongoose.connect(url, { useNewUrlParser: true })

///////////////////////////////////////////////////
mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + url)
})
mongoose.connection.on('error', function(err) {
	console.error('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected')
})

process.once('SIGUSR2', function() {
	shutdown('nodemon restart', function() {
		process.kill(process.pid, 'SIGUSR2')
	})
})
process.on('SIGINT', function() {
	shutdown('app termination', function() {
		process.exit(0)
	})
})
process.on('SIGTERM', function() {
	shutdown('Heroku app shutdown', function() {
		process.exit(0)
	})
})
function shutdown(msg, callback) {
	mongoose.connection.close(function() {
		console.log('Mongoose disconnected through ' + msg)
		callback()
	})
}
///////////////////////////////////////////////////