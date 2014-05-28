var mongoose = require('mongoose');

// create search storage schema
var geoSearchSchema = mongoose.Schema({
  searchLocation: {
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
  searchQuery: {
    type: [String]
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  lastSearched: {
    type: Date,
    default: Date.now
  }
})