'use strict';

module.exports = {
	home: function(req, res) {
		var isLoggedIn = req.isAuthenticated();
		res.render('index', {isLoggedIn: isLoggedIn});
	},
	search: function(req, res) {
		var location = req.body.location;
		var isLoggedIn = req.isAuthenticated();
		res.redirect(`/bars/${location}`, {isLoggedIn: isLoggedIn});
	},
}