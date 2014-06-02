'use strict';

var glutResultsControllers = angular.module('glutResultsControllers', []);

glutResultsControllers.controller('resultsCtrl', ['$scope', '$routeParams', 'factoryTwitterSearch', 'markerFactory',
  function($scope, $routeParams, factoryTwitterSearch, markerFactory) {

    // console.log('loaded resultsCtrl');

    // load google maps api default options
    $scope.mapOptions = {
      center: new google.maps.LatLng(20,-30),
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      panControl: false,
      zoomControl: true,
      scaleControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
    };


    // setup markers and current marker
    $scope.myMarkers = [];
    $scope.currentMarkerInfo = {};
    $scope.currentMarkerInfo.user = {};

    $scope.searchId = $routeParams.searchId;
    // place for returned search information
    $scope.search = {};

    // returned found tweet information
    $scope.results = {};
    $scope.results.tweets = [];
    $scope.results.geoTweets = [];
    $scope.results.returned = false;
    
    // perform twitter search for desired location and query
    factoryTwitterSearch.getTweetsBySearchId($routeParams.searchId)
      .then(function(data) {
        console.log('recieved-', data);
        $scope.search = data.search;
        //set map for factory
        markerFactory.setMyMap($scope.myMap);

        $scope.results.tweets = data.statuses;
        // filter geotweets
        $scope.results.geoTweets = $scope.results.tweets.filter(function(tweet) {
          return tweet.geo != null;
        });
        // create markers for geotweets
        for (var i = 0; i < $scope.results.geoTweets.length; i++) {
          var tempMarker = markerFactory.createAndAddMarker($scope.results.geoTweets[i].geo[0],$scope.results.geoTweets[i].geo[1]);
          $scope.results.geoTweets[i].marker = tempMarker;
          $scope.myMarkers.push($scope.results.geoTweets[i].marker);
        };
        // $scope.$apply();
      }).then(function() {
        if ($scope.results.geoTweets.length == 0){
          $scope.myMap.setCenter({lat: +$scope.search.latitude, lng: +$scope.search.longitude});
          $scope.myMap.setZoom(15);
          $scope.results.returned = true;
        } else {
          $scope.results.returned = true;
          // pan to all geotweets
          var allMarkerBounds = new google.maps.LatLngBounds();
          $scope.myMarkers.forEach(function(marker) {
            allMarkerBounds.extend(marker.getPosition());
          });
          $scope.myMap.setCenter(allMarkerBounds.getCenter());
          $scope.myMap.fitBounds(allMarkerBounds);
          if ($scope.myMap.getZoom() >= 18) {
            $scope.myMap.setZoom(17);
          }
        }
      });


    $scope.openMarkerInfo = function(marker) {
      $scope.currentMarkerInfo.marker = marker;
      var currentTweet = $scope.results.geoTweets.filter(function(tweet) {
        return tweet.marker == marker;
      })[0];
      $scope.currentMarkerInfo.user.screen_name = currentTweet.user.screen_name;
      $scope.currentMarkerInfo.text = currentTweet.text;
      $scope.myInfoWindow.open($scope.myMap, marker);
    };
    $scope.panToMarkerOpenInfo = function(tweet) {
      $scope.currentMarkerInfo.user.screen_name = tweet.user.screen_name;
      $scope.currentMarkerInfo.text = tweet.text;
      $scope.currentMarkerInfo.marker = tweet.marker;
      $scope.myInfoWindow.open($scope.myMap, tweet.marker);
      $scope.myMap.panTo(tweet.marker.getPosition());
    }


}]);