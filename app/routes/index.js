'use strict'

var path = require('path');
require('dotenv').config();
var Yelp = require('yelp');



var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});


module.exports = function (app) {
	app.set('views', path.join(__dirname, '../views'));
	app.set('view engine', 'jade');

	app.get('/', function(req, res) {
		res.render('index');
		})
		.post('/', function(req, res) {
			var location = req.body.location;
			res.redirect(`/bars/${location}`);
		});

	app.get('/bars/:place', function(req, res) {
		// api call
		yelp.search({ term: 'bar', location: req.params.place })
			.then(function (data) {
  				res.send(data);
  			})
			.catch(function (err) {
  				console.error(err);
  				res.sendStatus(500);
			});
	});


	app.route('/api/:loc')
		.get(function (req, res) {

		});

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}