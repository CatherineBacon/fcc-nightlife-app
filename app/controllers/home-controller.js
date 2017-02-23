'use strict';

module.exports = {
	home: function(req, res) {
		var isLoggedIn = req.isAuthenticated();
		var user = req.user;
		res.render('index', {
			isLoggedIn: isLoggedIn,
			user: user,
		});
	},
	search: function(req, res) {
		var location = req.body.location;
		var isLoggedIn = req.isAuthenticated();
		var user = req.user;
		res.redirect(`/bars/${location}`, {
			isLoggedIn: isLoggedIn,
			username: user.username,
			user: user,
		});
	},
}