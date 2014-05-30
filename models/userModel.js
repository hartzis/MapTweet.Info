var mongoose = require('mongoose');

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
    type: [mongoose.Schema.ObjectId]
  },
  twitter_id: {
    type: String,
    required: true,
    unique: true
  },
  twitter_token:{
    type: String,
    required: true
  },
  twitter_tokenSecret: {
    type: String,
    required: true
  },
  twitter: {}
})

// user model
var User = mongoose.model('user', userSchema);

// find user, if not found create a new user
var findOrCreate = function(token, tokenSecret, profile, cb) {
    console.log('trying to find or create new twitter user-', profile.username, profile.id);
    // try to find user
    User.findOne({
        twitter_id: profile.id
    }, function(err, user) {
        if (err) console.log('error finding-', err);
        if (user) {
            console.log('found user-', user.screen_name, user.twitter_id);
            user.twitter = profile._json;
            user.twitter_token = token;
            user.twitter_tokenSecret = tokenSecret;
            // User.update({twitter_id: user.twitter_id}, {$set:{twitter_token: token, twitter_tokenSecret: tokenSecret, twitter: profile._json}}, function(err, user) {
            //   if (err){
            //     console.log('error updating user info-', err);
            //     cb(err, user);
            //   } else {
            //     cb(err, user)
            //   }
            // })
            user.save(function(err, user) {
              if (err) console.log('error updating user info-', err);
              cb(err, user)
            })
        // didn't find user, saving new user
        } else {
            // create new user object
            var newUser = new User();
            // set new user properties
            newUser.twitter_id = profile.id;
            newUser.user_name = profile.displayName || '';
            newUser.screen_name = profile.username || '';
            newUser.twitter_token = token;
            newUser.twitter_tokenSecret = tokenSecret;
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
                console.log('this user saved-', user.screen_name);
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

