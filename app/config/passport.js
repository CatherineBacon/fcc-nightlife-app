'use strict';

var GithubStrategy = require('passport-github').Strategy;

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

	passport.use(
		new GithubStrategy({
			'clientID': process.env.GIT_CLIENT_ID,
			'clientSecret': process.env.GIT_CLIENT_SECRET,
			'callbackURL': process.env.APP_URL + 'auth/github/callback'
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
	);
};
