var passport = require('passport');
// load twitter strategy
var TwitterStrategy = require('passport-twitter');

// inlude user model
var UserModel = require('../models/userModel');

// include config controller
var conf = require('./conf.js')

// serialize and deserialize by mongo db user id
passport.serializeUser(function(user, done) {
  // uses user._id for id
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  UserModel.User.findById(id, function(err, user) {
    done(err, user);
  })
})

// make the twitter strategy
var twitterStrategy = new TwitterStrategy({
        consumerKey: conf.twitter.ApiKey,
        consumerSecret: conf.twitter.ApiSecret,
        callbackURL: conf.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        console.log('token-', token, 'tokenSecret-', tokenSecret, 'profile-', profile.username, profile.id);
        UserModel.findOrCreate(token, tokenSecret, profile, function(err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    }
)

//create twitter strategy
passport.use(twitterStrategy);

// don't need to export much, but this helpful middleware allows us
// to block access to routes if the user isn't authenticated by redirecting
// them to the login page. We'll see this used in app.js
module.exports = {
    ensureAuthenticated: function(req, res, next) {

        // If the current user is logged in...
        if (req.isAuthenticated()) {

            // Middleware allows the execution chain to continue.
            return next();
        }

        // If not, redirect to login
        res.redirect('/auth/login');
    }
};