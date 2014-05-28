
var glutLatLngServices = angular.module('glutLatLngServices', []);

glutLatLngServices.factory('factoryLatLng', ['$http', function($http) {
  return {
    // retrieve lat/lng from server to save users requests
    getLatLng: function(address) {
      return $http.get('/getLatLng', {
        params: {
          address: address
        }
      }).then(function(res) {
        return res.data;
      })  
    },
    // actively query location from google geocode and return searches
    queryAddresses: function(address) {
      // console.log('querying-', address);
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          sensor: false
          }
      }).then(function(res){
        var addresses = [];
          angular.forEach(res.data.results, function(item){
            addresses.push(item.formatted_address);
          });
        return addresses;
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