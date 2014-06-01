'use strict';

var glutResultsControllers = angular.module('glutResultsControllers', []);

glutResultsControllers.controller('resultsCtrl', ['$scope', '$routeParams', 'factoryTwitterSearch', 'markerFactory',
  function($scope, $routeParams, factoryTwitterSearch, markerFactory) {

    console.log('loaded resultsCtrl');

    // load google maps api default options
    $scope.mapOptions = {
      center: new google.maps.LatLng(20,-30),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    // setup array for markers
    $scope.myMarkers = [];

    $scope.searchId = $routeParams.searchId;

    $scope.results = {};
    $scope.results.tweets = [];
    $scope.results.geoTweets = [];
    $scope.results.returned = false;
    
    factoryTwitterSearch.getTweetsBySearchId($routeParams.searchId)
      .then(function(data) {
        //set map for factory
        console.log('setting map to-', $scope.myMap);
        markerFactory.setMyMap($scope.myMap);
        console.log('map set to-', markerFactory.getMyMap());
        
        console.log('found search and pulled data to the scope level-', data);
        $scope.results.tweets = data.statuses;
        $scope.results.geoTweets = $scope.results.tweets.filter(function(tweet) {
          return tweet.geo != null;
        });
        console.log('trying to make markers for-', $scope.results.geoTweets);

        for (var i = 0; i < $scope.results.geoTweets.length; i++) {
          console.log('making marker for-', $scope.results.geoTweets[i])
          var tempMarker = markerFactory.createAndAddMarker($scope.results.geoTweets[i].geo[0],$scope.results.geoTweets[i].geo[1]);
          $scope.results.geoTweets[i].marker = tempMarker;
          $scope.myMarkers.push($scope.results.geoTweets[i].marker);
        };
        $scope.results.returned = true;
        // $scope.$apply();
      })




    //ui-map demo stuff
    // $scope.myMarkers = [];

    // $scope.addMarker = function($event, $params) {
    //   $scope.myMarkers.push(new google.maps.Marker({
    //     map: $scope.myMap,
    //     position: $params[0].latLng
    //   }));
    // };

    $scope.openMarkerInfo = function(marker) {
      $scope.currentMarker = marker;
      $scope.currentMarkerLat = marker.getPosition().lat();
      $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.myInfoWindow.open($scope.myMap, marker);
    };
     
    // $scope.setMarkerPosition = function(marker, lat, lng) {
    //   marker.setPosition(new google.maps.LatLng(lat, lng));
    // };

    $scope.panToOpenInfo = function(marker) {
      $scope.myMap.panTo(marker.getPosition());
      $scope.currentMarker = marker;
      $scope.currentMarkerLat = marker.getPosition().lat();
      $scope.currentMarkerLng = marker.getPosition().lng();
      $scope.myInfoWindow.open($scope.myMap, marker);
    }

}]);