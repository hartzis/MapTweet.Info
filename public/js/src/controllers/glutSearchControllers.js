'use strict';

var glutSearchControllers = angular.module('glutSearchControllers', [])

glutSearchControllers.controller('searchCtrl', ['$scope', 'factoryLatLng', 'factoryTwitterSearch',
    function($scope, factoryLatLng, factoryTwitterSearch) {
        
        console.log('glutControllers and MainCtrl loaded');

        // init settings
        $scope.search = {};
        $scope.search.radiusUnit = 'Km';
        $scope.search.useCurrentLocation = 'Use My Location'

        // set search radius unit type
        $scope.changeRadiusUnit = function(unit) {
          $scope.search.radiusUnit = unit;
        };
        // send server request to get lat/lng
        $scope.getGeo = function(address) {
          factoryLatLng.getLatLng(address)
            .then(function(data) {
              $scope.search.latitude = data.latitude;
              $scope.search.longitude = data.longitude;
            });
        };
        // live search for location from google geocode api
        $scope.queryAddresses = function(address) {
          return factoryLatLng.queryAddresses(address);
        };
        // retrieve users current lat/lng if possible
        $scope.getCurrentLocation = function() {
          var currentLocation = factoryLatLng.getCurrentLocation(function(currentLocation) {
            if (currentLocation.notSupported){
              $scope.search.useCurrentLocation = 'Unable to use My Location'
            } else {
              $scope.search.latitude = currentLocation.latitude;
              $scope.search.longitude = currentLocation.longitude;
              // "refresh" scope
              $scope.$apply();
            }
          });
        }

    }
]);