'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema ({
	name: String,
	img_url: String,
	snippet_text: String,
	votes: [{
		user: String,
		date: String
	}]
});

module.exports = mongoose.model('Bar', Bar)