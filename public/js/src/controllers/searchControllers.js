'use strict';
(function() {
  var searchControllers = angular.module('searchControllers', [])

  searchControllers.controller('searchCtrl', ['$scope', '$location', 'factoryLatLng', 'factoryTwitterSearch',
      function($scope, $location, factoryLatLng, factoryTwitterSearch) {

          // init settings
          $scope.counts = [{
            label: '25 Tweets',
            value: '25'
          },{
            label: '50 Tweets',
            value: '50'
          },{
            label: '75 Tweets',
            value: '75'
          },{
            label: '150 Tweets',
            value: '150'
          }
          ];
          $scope.search = {};
          $scope.search.query = '';
          $scope.search.count = '50';
          $scope.search.location = '';
          $scope.search.radius = 25;
          $scope.search.radiusUnit = 'Km';
          $scope.search.useCurrentLocation = 'Use My Current Location';
          $scope.search.usedCurrentLocation = false;
          $scope.search.retrievingCurrentLoc = false;
          $scope.submittingSearch = false;
          $scope.gotLatLng = false;

          // set requested search fields from query
          for (var prop in $location.search()) {
            if ($location.search().hasOwnProperty(prop)) {
              if (prop === 'radius') {
                $scope.search[prop] = parseInt($location.search()[prop]);
              } else {
                $scope.search[prop] = $location.search()[prop];
              }
            }
          }

          // set search radius unit type
          $scope.changeRadiusUnit = function(unit) {
            $scope.search.radiusUnit = unit;
          };
          // send server request to get lat/lng
          $scope.getGeo = function(location) {
            if (location != '') {
              factoryLatLng.getLatLng(location)
                .then(function (data) {
                  $scope.search.latitude = data.geo.lat;
                  $scope.search.longitude = data.geo.lng;
                  $scope.search.location = data.formattted_address;
                  $scope.gotLatLng = true;
                });
            }
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
            $scope.submittingSearch = true;
            factoryTwitterSearch.postTwitterSearch($scope.search)
          }

      }
  ]);
})();
