'use strict'

var path = process.cwd();

module.exports = function (app) {

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/app/views/index.html' )
		});

	app.route('/api/:loc')
		.get(function (req, res) {

		});

	app.route('/login')
	// login then go back to previous page

	app.route('/logout')
	//logout; then go back to previous page

}