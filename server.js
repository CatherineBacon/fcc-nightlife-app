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
app.use(session({ secret: 'secretNightlife' }));
app.use(passport.initialize());
app.use(passport.session());



routes(app, passport);



var port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});

