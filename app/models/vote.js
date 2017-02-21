'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema ({
	user: String,
	bar: String,
	date: Date,
});

module.exports = mongoose.model('Vote', Vote)