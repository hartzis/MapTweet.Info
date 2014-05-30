// load model to save searches
var searchModel = require('../models/searchModel.js');

// twitter api node module
var Twit = require('twit');

// load required api keys/secrets
var conf = require('../conf.js');

// create and save geo search then perform cb
var createAndSaveGeoSearch = function(theGeoSearch, cb) {
  var newGeoSearch = new searchModel.GeoSearch;
  for (var key in theGeoSearch){
    newGeoSearch[key] = theGeoSearch[key];
  };
  newGeoSearch.save(function(err, savedSearch) {
    console.log('new GeoSearch saved-', savedSearch);
    cb(err, savedSearch)
  })
};

// find saved search then perform cb
var findGeoSearch = function(searchId, cb) {
  searchModel.GeoSearch.findById(searchId, function(err, foundSearch) {
    if (err){
      console.log('error happened-', err);
    }
    cb(foundSearch)
  })
}

// perform the twitter api search
var twitterSearch = function(cb, options) {

  var T = new Twit({
    consumer_key:         conf.twitter.ApiKey
  , consumer_secret:      conf.twitter.ApiSecret
  , access_token:         conf.twitter.myTwitterToken
  , access_token_secret:  conf.twitter.myTwitterTokenSecret
  });

  var query = options.query || '';
  var count = options.count || 20;
  var geocode = options.geocode || '';
  var until = options.until || '';
  var since_id = options.since_id || '';

  console.log('about to perform twitter api call-', query, geocode, count);

  T.get('search/tweets', {
    q: query,
    geocode: geocode,
    count: count
  }, function(err, data, response) {
    if (err){
      console.log('err-', err);
    }
    // console.log('response-', response);
    // console.log('tweets returned-', data.statuses);
    cb(data);
  })

}

// setup searchController object to be exported
var searchController = {
  postSearch: function(req, res) {
    // check if first if user is authenticated


    // save the search and return id
    var theGeoSearch = req.body;
    createAndSaveGeoSearch(theGeoSearch, function(err, savedSearch) {
      if (err){
        console.log('error saving');
        res.send(500, 'error saving saving/permforming search');
        return;
      }
      res.send(savedSearch);
    })
  },
  // perform twitter api search route
  getSearch: function(req, res) {
    // get search id
    var searchId = req.query.searchId;
    // find requested search by id
    findGeoSearch(searchId, function(foundSearch) {
      // setup twitter api search params
      var options = {
        query: foundSearch.query,
        geocode: ''+foundSearch.latitude+','+foundSearch.longitude+','+foundSearch.radius+foundSearch.radiusUnit.toLowerCase()
      }
      // calling the twitter api with a callback and options
      twitterSearch(function(tweets) {
        // clean up tweets before sending them out
        var cleanedTweets = tweets.statuses.map(function(tweet) {
          if (tweet.geo){
            var geo = tweet.geo.coordinates;
          } else if (tweet.coordinates) {
            var geo = [tweet.coordinates.coordinates[1], tweet.coordinates.coordinates[0]];
          }
          if (tweet.entities.media){
            var media = tweet.entities.media
          }
          return {
            text: tweet.text,
            created_at: tweet.created_at,
            geo: geo || null,
            id_str: tweet.id_str,
            entities: {
              media: media || null
            },
            user: {
              geo_enabled: tweet.user.geo_enabled,
              profile_image_url: tweet.user.profile_image_url,
              name: tweet.user.name,
              screen_name: tweet.user.screen_name,
              id_str: tweet.user.id_str,
              retweeted: tweet.retweeted,
              retweet_count: tweet.retweet_count
            }
          }
        })
        var newTweets = {
          statuses: cleanedTweets,
          search_metadata: tweets.search_metadata
        }

        res.send(newTweets)
      }, options);
    });
  }
}

//export object
module.exports = searchController;