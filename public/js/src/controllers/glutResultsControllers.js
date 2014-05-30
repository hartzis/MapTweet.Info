'use strict';

var glutResultsControllers = angular.module('glutResultsControllers', []);

glutResultsControllers.controller('resultsCtrl', ['$scope', '$routeParams', 'factoryTwitterSearch',
  function($scope, $routeParams, factoryTwitterSearch) {

    console.log('loaded resultsCtrl');

    $scope.searchId = $routeParams.searchId;

    $scope.results = {};
    $scope.results.tweets = [];
    $scope.results.geoTweets = [];
    $scope.results.returned = false;
    
    factoryTwitterSearch.getTweetsBySearchId($routeParams.searchId)
      .then(function(data) {
        console.log('found search and pulled data to the scope level-', data);
        $scope.results.tweets = data.statuses;
        $scope.results.geoTweets = $scope.results.tweets.filter(function(tweet) {
          return tweet.geo != null;
        })
        $scope.results.returned = true;
        // $scope.$apply();
      })

    $scope.mapOptions = {
      center: new google.maps.LatLng(35.784, -78.670),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

}])