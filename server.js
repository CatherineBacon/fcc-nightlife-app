'use strict';

var express = require('express');
require('dotenv').config();
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();


require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI)

app.use(bodyParser.urlencoded({ extend: true }));
app.use(session({ 
	secret: 'secretNightlife', 
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public/css', express.static(process.cwd() + '/public/css'));
app.use('/public/fonts', express.static(process.cwd() + '/public/fonts'));
app.use('/public/js', express.static(process.cwd() + '/public/js'));


routes(app, passport);



var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});

