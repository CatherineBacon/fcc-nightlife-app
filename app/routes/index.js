'use strict'

//var path = process.cwd();
var path = require('path');


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
		res.send(req.params.place);
	});

	//app.route('/')
	//	.get(function (req, res) {
	//		res.sendFile(path + '/app/views/index.html' )
	//	});

	app.route('/api/:loc')
		.get(function (req, res) {

		});

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}