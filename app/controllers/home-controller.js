'use strict';

module.exports = {
	home: function(req, res) {
		var isLoggedIn = req.isAuthenticated();
		var user = req.user || 'user';
		res.render('index', {
			isLoggedIn: isLoggedIn,
			user: user,
		});
	},
	search: function(req, res) {
		var location = req.body.location;
		if(location.trim().length==0){
			res.redirect('/');
		}
		console.log(location);
		var isLoggedIn = req.isAuthenticated();
		var user = req.user || 'user';
		res.redirect(`/bars/${location}`, {
			isLoggedIn: isLoggedIn,
			user: user,
		});
	},
}