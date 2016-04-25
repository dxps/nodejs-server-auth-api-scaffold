
// -------------------------
// Authentication Controller
// -------------------------

const jwt = require('jwt-simple');
const config = require('../config');

const User = require('../models/user');

function tokenForUser(user) {
	// jwt conventions: sub = subject, iat = issued at time
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password)
    	return res.status(422).send({ error: "You must provide an email and password."});

    User.findOne({ email: email }, function(err, existingUser) {

        // an error has occured
        if (err)
            return next(err);

        // the user exists
        if (existingUser)
            return res.status(422).send({ error: 'Email is in use' });

        // save the user
        const user = new User({ email: email, password: password });
        user.save(function(err) {
        	if (err) return next(err);
        	// respond to the request indicating that the user was created
        	return res.json({ token: tokenForUser(user) });
        });
    });

}

exports.signin = function(req, res, next) {

	res.send({ token: tokenForUser(req.user) });
}

