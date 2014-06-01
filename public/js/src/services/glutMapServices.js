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
        position: new google.maps.LatLng(lat, lng)
      });
      return newMarker;
    },
    getMyMap: function() {
      return myMap;
    }

    // openMarkerInfo: function(marker) {
    //   $scope.currentMarker = marker;
    //   $scope.currentMarkerLat = marker.getPosition().lat();
    //   $scope.currentMarkerLng = marker.getPosition().lng();
    //   $scope.myInfoWindow.open($scope.myMap, marker);
    // },
     
    // setMarkerPosition: function(marker, lat, lng) {
    //   marker.setPosition(new google.maps.LatLng(lat, lng));
    // },

    // panToOpenInfo: function(marker, map) {
    //   $scope.myMap.panTo(marker.getPosition());
    //   $scope.currentMarker = marker;
    //   $scope.currentMarkerLat = marker.getPosition().lat();
    //   $scope.currentMarkerLng = marker.getPosition().lng();
    //   $scope.myInfoWindow.open($scope.myMap, marker);
    // }
  }
}])