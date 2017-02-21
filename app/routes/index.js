'use strict'

var path = require('path');

var Yelp = require('yelp');

var Vote = require('../models/vote.js');


var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

module.exports = function (app) {
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	app.route('/')
		.get(function(req, res) {
		res.render('index');
		})
		.post(function(req, res) {
			var location = req.body.location;
			res.redirect(`/bars/${location}`);
		});

	app.route('/bars/:place')
		.get(function(req, res) {
			var place = req.params.place;
			// api call
			yelp.search({ term: 'bar', location: place })
				.then(function (data) {
					console.log(data);
					var bars = data.businesses;
					var barIds = bars.map(function(bar) {
						return bar.id;
					});
					Vote.find({'bar': {$in: barIds} }, function(err, votes) {
						if (err) console.log(err)
						bars = bars.map(function(bar) {
							bar.going = votes.filter(function(v){
								return v.bar==bar.id;
							}).length;
							return bar;
						})
						res.render('bars', {
	  						bars: bars,
	  						place: place,
	  					});
					});
	  			})
				.catch(function (err) {
	  				console.error(err);
	  				res.sendStatus(500);
				});
		});


	app.route('/api/going/:place/:barId')
		.get(function (req, res) {
			var barId = req.params.barId,
				place = req.params.place;
			var vote = new Vote({ bar: barId, user: 'x', date: new Date() });
			vote.save(function(err, vote) {
				if (err) console.log(err);
				res.redirect(`/bars/${place}`);
			});
		});

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}