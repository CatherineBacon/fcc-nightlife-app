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
			return res.redirect('/');
		}
		console.log(location);
		res.redirect(`/bars/${location}`);
	},
}