var mongoose = require('mongoose');

// require search model to store saved searches to user
var searchModel = require('./searchModel.js')

// create user schema for wanted attributes
var userSchema = mongoose.Schema({
  user_name: {
    type: String
  },
  screen_name: {
    type: String,
    required: true
  },
  user_created_at: {
    type: Date,
    default: Date.now
  },
  geo_searches: {
    type: [searchModel.GeoSearch]
  },
  twitter_id: {
    type: String,
    required: true,
    unique: true
  },
  twitter: {}
})

// user model
var User = mongoose.model('user', userSchema);

// find user, if not found create a new user
var findOrCreate = function(profile, cb) {
    console.log('trying to find or create new twitter user-', profile.username, profile.id);
    // try to find user
    twitterUser.findOne({
        twitter_id: profile.id;
    }, function(err, user) {
        if (err) console.log('error finding-', err);
        if (user) {
            console.log('found user-', user.screen_name, user.twitter.id_str, )
            User.update(user.twitter_id, {$set:{twitter:profile._json}}, function(err, user) {
              if (err){
                console.log('error updating user info-', err);
                cb(err, user);
              } else {
                cb(err, user)
              }
            })
        // didn't find user, saving new user
        } else {
            // create new user object
            var newUser = new User();
            // set new user properties
            newUser.twitter_id = profile.id;
            newUser.user_name = profile.displayName || '';
            newUser.screen_name = profile.username || '';
            newUser.twitter = profile._json;

            // for (var key in User.schema.paths.twitter){
            //   newUser[key] = profile._json[key] || '';
            // }

            // save user then perform callback
            newUser.save(function(err, user) {
              if (err) {
                console.log('error saving-', err);
                cb(err, user);
              } else {
                console.log('this user saved-', user);
                cb(err, user);
              }
            })

        }
    })
}


module.exports = {
  User: User,
  findOrCreate: findOrCreate
}

