'use strict';

var express = require('express');
var path = process.cwd();
var ServiceHandler = require(path + '/app/controllers/serviceHandler.server.js');
var mongoose = require('mongoose');
var serviceHandler = new ServiceHandler();

var app = express();
require('dotenv').load();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));

app.route('/')
	.get(function (req, res) {
		res.sendFile(path + '/public/index.html');
	});
	
app.route("/imagesearch/:id")
	.get(serviceHandler.imageSearch);
	
app.route("/latest/imagesearch/")
	.get(serviceHandler.recentSearches);
	
		

var port = process.env.PORT || 8080;
var server;

var boot = function() {
	server = app.listen(port, function() {
		console.log('Node.js listening on port ' + port + '...');
	});

}

var shutdown = function() {
	if (server) {
		server.close();
	}
}

var connectDB = function(dbName) {
	var connection = mongoose.connect(process.env.MONGO_URI + dbName);
	return connectDB;
}
var disconnectDB = function() {
    mongoose.connection.close();
    mongoose.disconnect();
}

if (require.main === module) {
	connectDB(process.env.MONGO_DB);
	boot();
}
else {
	console.info('Running app as a module.')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = port;
	exports.connectDB = connectDB;
	exports.disconnectDB = disconnectDB;
}