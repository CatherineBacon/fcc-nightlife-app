'use strict'

var Vote = require('../models/vote.js');

module.exports = {
	vote: function(req, res) {
		var barId = req.params.barId,
			place = req.params.place;
		var vote = new Vote({ bar: barId, user: 'x', date: new Date() });
		vote.save(function(err, vote) {
			if (err) console.log(err);
			res.redirect(`/bars/${place}`)
		});
	}
}
