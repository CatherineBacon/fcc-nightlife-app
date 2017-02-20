'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var app = express();

var path = require('path');
var port = process.env.PORT || 8080;


routes(app);


app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});

//// TO DO ////
// + display something on localhost:8080
// - box where can type location
// - display fake data bars
// - mongodb set up
// - voting - only once
// - attendance tonight - times in mongo
// - yelp api
// - add auth
// - heroku