'use strict';

var glutSearchControllers = angular.module('glutSearchControllers', [])

glutSearchControllers.controller('searchCtrl', ['$scope', 'factoryLatLng', 'factoryTwitterSearch',
    function($scope, factoryLatLng, factoryTwitterSearch) {
        
        console.log('glutControllers and MainCtrl loaded');

        // init settings
        $scope.search = {};
        $scope.search.location = '';
        $scope.search.radiusUnit = 'Km';
        $scope.search.useCurrentLocation = 'Use My Location'
        $scope.search.usedCurrentLocation = false;

        // set search radius unit type
        $scope.changeRadiusUnit = function(unit) {
          $scope.search.radiusUnit = unit;
        };
        // send server request to get lat/lng
        $scope.getGeo = function(location) {
          factoryLatLng.getLatLng(location)
            .then(function (data) {
              $scope.search.latitude = data.latitude;
              $scope.search.longitude = data.longitude;
            });
        };
        // live search for location from google geocode api
        $scope.queryLocations = function(location) {
          return factoryLatLng.queryLocations(location);
        };
        // retrieve users current lat/lng if possible
        $scope.getCurrentLocation = function() {
          var currentLocation = factoryLatLng.getCurrentLocation(function(currentLocation) {
            if (currentLocation.notSupported){
              $scope.search.useCurrentLocation = 'Unable to use My Location'
            } else {
              $scope.search.latitude = currentLocation.latitude;
              $scope.search.longitude = currentLocation.longitude;
              $scope.search.usedCurrentLocation = true;
              // "refresh" scope
              $scope.$apply();
            }
          });
        }
        // submit geo search, saves, then returns object with id
        // if successful route user to search/:searchId to display data
        $scope.submitSearch = function () {
            factoryTwitterSearch.postTwitterSearch($scope.search)
              // .then(function (savedSearch) {
              //     console.log('saved and returned search obj-', savedSearch);
              // })
        }

    }
]);