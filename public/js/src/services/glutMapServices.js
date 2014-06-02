var glutMapServices = angular.module('glutMapServices', []);

glutMapServices.factory('markerFactory', [
  function() {
    var myMap = null;
  return {
    setMyMap: function(map) {
      myMap = map;
    },
    createAndAddMarker: function(lat, lng) {
      var newMarker = new google.maps.Marker({
        map: myMap,
        position: new google.maps.LatLng(lat, lng),
        icon: '../../img/bird_blue_32.png'
      });
      return newMarker;
    },
    getMyMap: function() {
      return myMap;
    }

  }
}])