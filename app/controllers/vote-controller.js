'use strict'

var Vote = require('../models/vote.js');

module.exports = {
	vote: function(req, res) {
		var barId = req.params.barId,
			place = req.params.place,
			isLoggedIn = req.isAuthenticated(),
			user = req.user || 'user',
			sixteenHours = 16 * 60 * 60 * 1000, /*16 hours in ms*/
			sixteenHoursAgo = new Date(new Date() - sixteenHours);
		
		if (isLoggedIn) {
			Vote.find( { 'bar': barId, 'date': {$gt: sixteenHoursAgo} }, function(err, votes) {
				if (err) console.log(err);
				var voted = votes.filter(function(v) {
								return v.user==user.username && v.bar==bar.id; 
							}).length > 0 ;
				if (voted) res.redirect(`/bars/${place}`);
				else {
					var vote = new Vote({ bar: barId, user: user.username, date: new Date() });
					vote.save(function(err, vote) {
						if (err) {
							console.log(err);
							res.sendStatus(500);
						}
						res.redirect(`/bars/${place}`);
					});
				}
			});		
		} else {
			res.redirect(`/bars/${place}`);
		}
	
	},

	remove: function(req, res) {
		var barId = req.params.barId,
			place = req.params.place,
			isLoggedIn = req.isAuthenticated(),
			user = req.user || 'user';

		if (isLoggedIn) {
			Vote.remove( { 'bar': barId, 'user': user.username }, function(err) {
				if (err) {
					console.log(err);
					res.sendStatus(500);
				}
				res.redirect(`/bars/${place}`);
			});
		} else {
			res.redirect(`/bars/${place}`);
		}
	},
}
