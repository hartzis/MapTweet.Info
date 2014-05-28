var searchModel = require('../models/searchModel.js');

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
  getSearch: function(req, res) {
    var searchId = req.params.searchId;
    res.send('search id-', searchId);
  }
}

module.exports = searchController;