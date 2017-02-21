'use strict';

module.exports = {
	home: function(req, res) {
		res.render('index');
	},
	search: function(req, res) {
		var location = req.body.location;
		res.redirect(`/bars/${location}`);
	},
}