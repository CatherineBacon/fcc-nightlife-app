'use strict'

var path = require('path');

var Yelp = require('yelp');


var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

var going = {};

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
					var bars = data.businesses.map(function(bar) {
						if (bar.id in going) {
							bar.going = going[bar.id];
						}
						return bar;
					});
	  				res.render('bars', {
	  					bars: bars,
	  					place: place,
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
			if (barId in going) {
				going[barId]++;
			} else {
				going[barId] = 1;
			}
			res.redirect(`/bars/${place}`);
		});

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}