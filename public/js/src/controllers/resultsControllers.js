'use strict';
(function(){
  var resultsControllers = angular.module('resultsControllers', ['ngSanitize']);

  resultsControllers.controller('resultsCtrl', ['$scope', '$routeParams', 'factoryTwitterSearch', 'markerFactory',
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
        },
        styles: [{"featureType":"all","stylers":[{"saturation":0},{"hue":"#e7ecf0"}]},{"featureType":"road","stylers":[{"saturation":-70}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
      };


      // setup markers and current marker
      $scope.myMarkers = [];
      $scope.currentMarkerInfo = {};
      $scope.currentMarkerInfo.user = {};

      $scope.searchId = $routeParams.searchId;
      // place for returned search information
      $scope.search = {};

      // setup filters
      $scope.filter = {};

      // returned found tweet information
      $scope.results = {};
      $scope.results.tweets = [];
      $scope.results.geoTweets = [];
      $scope.results.returned = false;
      
      // perform twitter search for desired location and query
      factoryTwitterSearch.getTweetsBySearchId($routeParams.searchId)
        .then(function(data) {
          // console.log('recieved-', data);
          // set the search information
          $scope.search = data.search;
          var tempLat = +data.search.latitude;
          var tempLong = +data.search.longitude;
          $scope.search.latitude = tempLat.toFixed(4);
          $scope.search.longitude = tempLong.toFixed(4);
          //set map for factory
          markerFactory.setMyMap($scope.myMap);

          $scope.results.tweets = data.statuses;
          angular.forEach($scope.results.tweets, function(tweet) {
            var splitDate = tweet.created_at.split(' ');
            tweet.created_at = [splitDate[1], splitDate[2], splitDate[3], splitDate[5]].join(" ");
          })
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
            $scope.myMap.setZoom(14);
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
            if ($scope.myMap.getZoom() >= 17) {
              $scope.myMap.setZoom(16);
            }
          }
        });


      $scope.openMarkerInfo = function(marker) {
        $scope.currentMarkerInfo.marker = marker;
        var currentTweet = $scope.results.geoTweets.filter(function(tweet) {
          return tweet.marker == marker;
        })[0];
        $scope.currentMarkerInfo.user = currentTweet.user;
        $scope.currentMarkerInfo.created_at = currentTweet.created_at;
        $scope.currentMarkerInfo.text = currentTweet.text;
        $scope.myInfoWindow.open($scope.myMap, marker);
      };
      $scope.panToMarkerOpenInfo = function(tweet) {
        if (!tweet.geo){
          return;
        } else {
          $scope.currentMarkerInfo.user = tweet.user;
          $scope.currentMarkerInfo.created_at = tweet.created_at;
          $scope.currentMarkerInfo.text = tweet.text;
          $scope.currentMarkerInfo.marker = tweet.marker;
          $scope.myInfoWindow.open($scope.myMap, tweet.marker);
          $scope.myMap.panTo(tweet.marker.getPosition());
        }
        

      }


  }]);
})();
