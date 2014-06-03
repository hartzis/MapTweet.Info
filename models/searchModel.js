var mongoose = require('mongoose');

// create search storage schema
var geoSearchSchema = mongoose.Schema({
  location: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  radius: {
    type: String
  },
  radiusUnit: {
    type: String
  },
  query: {
    type: String
  },
  usedCurrentLocation: {
    type: Boolean
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastSearched: {
    type: Date,
    default: Date.now
  },
  count: {
    type: String,
    default: '20'
  }
});

// create search model
var GeoSearch = mongoose.model('geosearch', geoSearchSchema);

module.exports = {
  GeoSearch: GeoSearch
}