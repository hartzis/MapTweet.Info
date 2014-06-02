'use strict';

var glutSearchControllers = angular.module('glutSearchControllers', [])

glutSearchControllers.controller('searchCtrl', ['$scope', '$location', 'factoryLatLng', 'factoryTwitterSearch',
    function($scope, $location, factoryLatLng, factoryTwitterSearch) {

        // init settings
        $scope.search = {};
        $scope.search.location = '';
        $scope.search.radius = '10'
        $scope.search.radiusUnit = 'Km';
        $scope.search.useCurrentLocation = 'Use My Current Location'
        $scope.search.usedCurrentLocation = false;
        $scope.search.retrievingCurrentLoc = false;

        // set requested search fields from query
        for (var prop in $location.search()) {
          if ($location.search().hasOwnProperty(prop)) {
            $scope.search[prop] = $location.search()[prop];
          }
        }

        // set search radius unit type
        $scope.changeRadiusUnit = function(unit) {
          $scope.search.radiusUnit = unit;
        };
        // send server request to get lat/lng
        $scope.getGeo = function(location) {
          factoryLatLng.getLatLng(location)
            .then(function (data) {
              $scope.search.latitude = data.lat;
              $scope.search.longitude = data.lng;
            });
        };
        // live search for location from google geocode api
        $scope.queryLocations = function(location) {
          return factoryLatLng.queryLocations(location);
        };
        // retrieve users current lat/lng if possible
        $scope.getCurrentLocation = function() {
          $scope.search.retrievingCurrentLoc = true;
          $scope.search.useCurrentLocation = "Retrieving Current Location...";
          factoryLatLng.getCurrentLocation(function(currentLocation) {
            if (currentLocation.notSupported){
              $scope.search.useCurrentLocation = 'Unable to use My Location'
            } else {
              // reverse geocode to get location
              factoryLatLng.reverseGeocode(currentLocation.latitude, currentLocation.longitude,
                function(location) {
                  $scope.search.location = location;
                  $scope.$apply();
                });
              // set $scope elements
              $scope.search.latitude = currentLocation.latitude;
              $scope.search.longitude = currentLocation.longitude;
              $scope.search.usedCurrentLocation = true;
              $scope.search.retrievingCurrentLoc = false;
              $scope.search.useCurrentLocation = 'Use My Current Location';
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