'use strict';

var Yelp = require('yelp');

var Vote = require('../models/vote.js');

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

module.exports = {
	search: function(req, res) {
		var place = req.params.place;
		yelp.search({term: 'bar', location: place })
			.then(function (data) {
				var bars = data.businesses;
				var barIds = bars.map(function(bar) {
					return bar.id;
				});
				var sixteenHours = 16 * 60 * 60 * 1000 /*16 hours in ms*/
				var sixteenHoursAgo = new Date(new Date() - sixteenHours);
				Vote.find({'bar': {$in: barIds}, 'date': {$gt: sixteenHoursAgo} }, function(err, votes) {
					if (err) console.log(err);
					bars = bars.map(function(bar) {
						bar.going = votes.filter(function(v) {
							return v.bar==bar.id ;
						}).length;
						return bar;
					});
					res.render('bars', {
						bars: bars,
						place: place,
					});
				});
			})
			.catch(function(err) {
				console.log(err);
				res.sendStatus(500);
			})
	},
}

