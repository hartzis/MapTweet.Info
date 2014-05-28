'use strict';

var glutResultsControllers = angular.module('glutResultsControllers', []);

glutResultsControllers.controller('resultsCtrl', ['$scope', '$routeParams', 
  function($scope, $routeParams) {

    console.log('loaded resultsCtrl');

    $scope.searchId = $routeParams.searchId;

    $scope.results = {};
    $scope.results.tweets = [
    {
      "id": 460833959761297400,
      "id_str": "460833959761297408",
      "text": "@luna_nando lmfao just a lil bit"
    },{
      "id": 460833650787893250,
      "id_str": "460833650787893248",
      "text": "Telecomm Reform Package passes Senate. Lots of bipartisan support & leadership from @hickforco!"
    },{
      "id": 460833569560989700,
      "id_str": "460833569560989697",
      "text": "@MeganZamani Hahahahahaha ❤️❤️",
    }];
    
}])