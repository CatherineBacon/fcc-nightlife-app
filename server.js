'use strict';

var express = require('express');
require('dotenv').config();
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(bodyParser.urlencoded({ extend: true }));

mongoose.connect(process.env.MONGO_URI)

var port = process.env.PORT || 8080;


routes(app);


app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});

