'use strict'

var path = require('path');

var homeController = require('../controllers/home-controller.js');
var barController = require('../controllers/bar-controller.js');
var voteController = require('../controllers/vote-controller.js');
var userController = require('../controllers/user-controller.js');

module.exports = function (app, passport) {
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	function ensureAuthenticated(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	};

	app.route('/')
		.get(homeController.home)
		.post(homeController.search);

	app.route('/about')
		.get(function(req, res) {
			res.render('about');
		})

	app.route('/bars/:place')
		.get(barController.search);

	app.route('/api/going/:place/:barId/:barName')
		.get(voteController.vote);

	app.route('/api/notgoing/:place/:barId/:barName')
		.get(voteController.remove);


	// login and logout related routes
	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(
			passport.authenticate('github', {
				failureRedirect: 'back'
			}),
			function(req, res) {
				res.redirect('back');
			}
		);

	app.route('/login')
	// login then go back to previous page  res.redirect('back');

	app.route('/profile/')
		.get(ensureAuthenticated, userController.profile);

	app.route('/logout')
		.get(function(req, res) {
			console.log('logging out');
			req.logout();
			res.redirect('back');
		});
}