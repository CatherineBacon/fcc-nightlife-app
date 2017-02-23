'use strict'

var path = require('path');

var homeController = require('../controllers/home-controller.js');
var barController = require('../controllers/bar-controller.js');
var voteController = require('../controllers/vote-controller.js');

module.exports = function (app, passport) {
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	app.route('/')
		.get(homeController.home)
		.post(homeController.search);

	app.route('/bars/:place')
		.get(barController.search);

	app.route('/api/going/:place/:barId')
		.get(voteController.vote);

	app.route('/api/notgoing/:place/:barId')
		.get(voteController.remove);


	// login and logout related routes
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			failureRedirect: '/'
		}),
		function(req, res) {
			res.redirect('/');
		}
		);

	app.route('/login')
	// login then go back to previous page  res.redirect('back');

	app.route('/logout')
		.get(function(req, res) {
			console.log('logging out');
			req.logout();
			res.redirect('back');
		});
}