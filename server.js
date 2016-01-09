'use strict';

var express = require('express');
var path = process.cwd();
var ServiceHandler = require(path + '/app/controllers/serviceHandler.server.js');
var serviceHandler = new ServiceHandler();

var multer  = require('multer');
var upload = multer();


var app = express();

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));


app.route("/fileanalyze/")
	.post(upload.single('inputFile'),serviceHandler.analyzeFile);

app.route('/')
	.get(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});


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


if (require.main === module) {
	boot();
}
else {
	console.info('Running app as a module.')
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = port;
}