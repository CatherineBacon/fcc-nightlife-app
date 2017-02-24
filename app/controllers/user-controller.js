'use strict';

var Vote = require('../models/vote.js');

module.exports = {

	profile: function(req, res) {
		var user = req.user,
			sixteenHours = 16 * 60 * 60 * 1000,
			sixteenHoursAgo = new Date(new Date() - sixteenHours),
			isLoggedIn = req.isAuthenticated();

		if(isLoggedIn) {
			Vote.find( { user: user.username, 'date': {$gt: sixteenHoursAgo} }, function(err, votes) {
				if(err) {
					console.log(err)
					res.sendStatus(500);
				};
				res.render('profile', {
					votes: votes,
					user: user,
					isLoggedIn: isLoggedIn,
				});
			} );
		} else {
			res.redirect('/');
		}
	
	},
};