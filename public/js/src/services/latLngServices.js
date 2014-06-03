
var latLngServices = angular.module('latLngServices', []);

latLngServices.factory('factoryLatLng', ['$http', function($http) {
  return {
    reverseGeocode: function(lat, lng, cb) {
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(+lat,+lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]){
            cb(results[1].formatted_address)
            return;
          }
          cb(results[0].formatted_address)
        }
      })
    },
    getLatLng: function(location) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          sensor: false
        }
      }).then(function(res) {
        console.log('ltlng q-', res.data);
        return {
          geo: res.data.results[0].geometry.location,
          formattted_address: res.data.results[0].formatted_address
        }
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