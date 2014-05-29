// load model to save searches
var searchModel = require('../models/searchModel.js');

// twitter api node module
var Twit = require('twit');

// load required api keys/secrets
var conf = require('../conf.js');

// create and save geo search then perform cb
var createAndSaveGeoSearch = function(theGeoSearch, cb) {
  var newGeoSearch = new searchModel.GeoSearch;
  // newGeoSearch.location = theGeoSearch.location;
  // newGeoSearch.latitude = theGeoSearch.latitude;
  for (var key in theGeoSearch){
    newGeoSearch[key] = theGeoSearch[key];
  };
  console.log('about to save-', newGeoSearch);
  newGeoSearch.save(function(err, savedSearch) {
    console.log('new GeoSearch saved-', savedSearch);
    cb(err, savedSearch)
  })
};

// find saved search then perform cb
var findGeoSearch = function(searchId, cb) {
  console.log('finding search id-', searchId);

  searchModel.GeoSearch.findById(searchId, function(err, foundSearch) {
    if (err){
      console.log('error happened-', err);
    }
    console.log('found this search-', foundSearch);
    cb(foundSearch)
  })
}

// perform the twitter api search
var twitterSearch = function(cb, options) {

  var T = new Twit({
    consumer_key:         conf.twitterApiKey
  , consumer_secret:      conf.twitterApiSecret
  , access_token:         conf.myTwitterToken
  , access_token_secret:  conf.myTwitterTokenSecret
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
    console.log('response-', response);
    console.log('tweets returned-', data);
    cb(data);
  })

}

// setup searchController object to be exported
var searchController = {
  postSearch: function(req, res) {
    // check if first if user is authenticated


    // save the search and return id
    var theGeoSearch = req.body;
    console.log('attempting to begin save search-', theGeoSearch);
    createAndSaveGeoSearch(theGeoSearch, function(err, savedSearch) {
      if (err){
        console.log('error saving');
        res.send(500, 'error saving saving/permforming search');
        return;
      }
      console.log('sending back after save-', savedSearch)
      res.send(savedSearch);
    })
  },
  // perform twitter api search route
  getSearch: function(req, res) {
    var searchId = req.query.searchId;
    console.log('req query searchId-', searchId);
    findGeoSearch(searchId, function(foundSearch) {
      // setup twitter api search params
      var options = {
        query: foundSearch.query,
        geocode: ''+foundSearch.latitude+','+foundSearch.longitude+','+foundSearch.radius+foundSearch.radiusUnit.toLowerCase()
      }
      console.log('submitting twitter api call with these options-', options);
      twitterSearch(function(tweets) {
        res.send(tweets)
      }, options);
    });
  }
}

module.exports = searchController;