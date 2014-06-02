
var glutLatLngServices = angular.module('glutLatLngServices', []);

glutLatLngServices.factory('factoryLatLng', ['$http', function($http) {
  return {
    // retrieve lat/lng from server to save users requests
    // getLatLng: function(location) {
    //   return $http.get('/api/getLatLng', {
    //     params: {
    //       location: location
    //     }
    //   }).then(function(res) {
    //     return res.data;
    //   })  
    // },
    getLatLng: function(location) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          sensor: false
        }
      }).then(function(res) {
        return res.data.results[0].geometry.location
      })
    },
    // actively query location from google geocode and return searches
    queryLocations: function(location) {
      // console.log('querying-', location);
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          // google api specific keys
          address: location,
          sensor: false
          }
      }).then(function(res){
        var locations = [];
          angular.forEach(res.data.results, function(item){
            locations.push(item.formatted_address);
          });
        return locations;
      });
    },
    // get users current location - lat/lng
    getCurrentLocation: function(cb) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          cb(position.coords);
        })
      } else {
        cb({notSupported: true});
      }
    }
  }
}])