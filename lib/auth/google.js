var async = require('async'),
	_ = require('underscore');

var passport = require('passport'),
	passportGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var keystone = require('keystone'),
	User = keystone.list('User');

var credentials = {
	clientID: process.env.GOOGLE_CLIENT_ID || '1089441587003-64uhsu6lm7fv4bcq98ldg7m0j8jo8am4.apps.googleusercontent.com',
	clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'acqsYsIsA7U7vXbaG-_NyS0I',
	callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000',
	
	scope: 'profile email'
};

exports.authenticateUser = function(req, res, next)
{
	var self = this;
	
	var redirect = '/auth/confirm';
	if (req.cookies.target && req.cookies.target == 'app') redirect = '/auth/app';
	
	// Begin process
	console.log('============================================================');
	console.log('[services.google] - Triggered authentication process...');
	console.log('------------------------------------------------------------');
	
	// Initalise Google credentials
	var googleStrategy = new passportGoogleStrategy(credentials, function(accessToken, refreshToken, profile, done) {
		done(null, {
			accessToken: accessToken,
			refreshToken: refreshToken,
			profile: profile
		});
	});
	
	// Pass through authentication to passport
	passport.use(googleStrategy);
	
	// Save user data once returning from Google
	if (_.has(req.query, 'cb')) {
		
		console.log('[services.google] - Callback workflow detected, attempting to process data...');
		console.log('------------------------------------------------------------');
		
		passport.authenticate('google', { session: false }, function(err, data, info) {
		
			if (err || !data) {
				console.log("[services.google] - Error retrieving Google account data - " + JSON.stringify(err));
				return res.redirect('/signin');
			}
			
			console.log('[services.google] - Successfully retrieved Google account data, processing...');
			console.log('------------------------------------------------------------');
			
			var auth = {
				type: 'google',
				
				name: {
					first: data.profile.name.givenName,
					last: data.profile.name.familyName
				},
				
				email: data.profile.emails.length ? _.first(data.profile.emails).value : null,
				
				website: data.profile._json.blog,
				
				profileId: data.profile.id,
				
				username: data.profile.username,
				avatar: data.profile._json.picture,
				
				accessToken: data.accessToken,
				refreshToken: data.refreshToken
			}
			
			req.session.auth = auth;
			
			return res.redirect(redirect);
			
		})(req, res, next);
	
	// Perform inital authentication request to Google
	} else {
		
		console.log('[services.google] - Authentication workflow detected, attempting to request access...');
		console.log('------------------------------------------------------------');
		
		passport.authenticate('google', { accessType: 'offline' })(req, res, next); // approvalPrompt: 'force'
	
	}
	
};
