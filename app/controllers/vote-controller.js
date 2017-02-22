'use strict'

var Vote = require('../models/vote.js');

module.exports = {
	vote: function(req, res) {
		var barId = req.params.barId,
			place = req.params.place,
			sixteenHours = 16 * 60 * 60 * 1000, /*16 hours in ms*/
			sixteenHoursAgo = new Date(new Date() - sixteenHours);
		Vote.find( { 'bar': barId, 'date': {$gt: sixteenHoursAgo} }, function(err, votes) {
			if (err) console.log(err);
			var voted = votes.filter(function(v) {
							return v.user=='x' && v.bar==bar.id; /* WILL NEED UPDATING WHEN ADD USER AUTH */
						}).length > 0 ;
			if (voted) res.redirect(`/bars/${place}`);
			else {
				var vote = new Vote({ bar: barId, user: 'x', date: new Date() });
				vote.save(function(err, vote) {
					if (err) console.log(err);
					res.redirect(`/bars/${place}`)
				});
			}
		});
	},

	remove: function(req, res) {
		var barId = req.params.barId,
			place = req.params.place;
		Vote.remove( { 'bar': barId, 'user': 'x' }, function(err) {
			if (err) console.log(err);
			res.redirect(`/bars/${place}`);
		});
	},
}
