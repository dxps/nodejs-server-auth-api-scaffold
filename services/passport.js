// passport is a library used for authenticating users
// a 'strategy' is a method used for handling the authentication

const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// ---------------------
// create local strategy
// ---------------------


const localOptions = { usernameField: 'email' };
const localLoginJwtStrategy = new LocalStrategy(localOptions, function(email, password, done) {
	// if the email and password are correct, call 'done' with the user,
	// otherwise, call 'done' with false
	User.findOne({ email: email}, function(err, user) {
		if (err)
			return done(err);
		if (!user)
			return done(null, false); // user was not found
		// compare passwords: is 'password' equal to user.password ?
		user.comparePassword(password, function(err, isMatch) {
			if (err)
				return done(err);
			if (!isMatch)
				return done(null, false);
			return done(null, user); // user will be placed into req.user 
		});
	});
});


// --------------------
// JWT Strategy options
// --------------------


const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// JWT Strategy creation

const loginJwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {

	// payload is the decoded jwt token
	// check if the userid in the payload exists in our database
	// if it does, call 'done' with that
	// otherwise, call 'done' without an user object
	User.findById(payload.sub, function(err, user) {
		if (err)
			return done(err, false); // 2nd argument would be the user object
		if (user)
			done(null, user);
		else
			done(null, false);
	});
});

// tell passport to use the strategy

passport.use(loginJwtStrategy);
passport.use(localLoginJwtStrategy);

