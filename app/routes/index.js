'use strict'

var path = require('path');

var homeController = require('../controllers/home-controller.js');
var barController = require('../controllers/bar-controller.js');
var voteController = require('../controllers/vote-controller.js');

module.exports = function (app) {
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	app.route('/')
		.get(homeController.home)
		.post(homeController.search);

	app.route('/bars/:place')
		.get(barController.search);


	app.route('/api/going/:place/:barId')
		.get(voteController.vote);

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}