'use strict';

var glutControllers = angular.module('glutControllers', [])

glutControllers.controller('MainCtrl', ['$scope', 'factoryLatLng',
    function($scope, factoryLatLng) {
        
        console.log('glutControllers and MainCtrl loaded');

        // init settings
        $scope.search = {};
        $scope.search.radiusUnit = 'Km';

        // set search radius unit type
        $scope.changeRadiusUnit = function(unit) {
          $scope.search.radiusUnit = unit;
        };
        
        $scope.getGeo = function(address) {
          console.log('getGeo-', address);
          factoryLatLng.getLatLng(address)
            .then(function(data) {
              $scope.search.latitude = data.latitude;
              $scope.search.longitude = data.longitude;
            });
          
        };

        $scope.queryAddresses = function(address) {
          return factoryLatLng.queryAddresses(address);
        };

        // use the factory to retrieve tweet data and or lat long
        // function getCustomersSummary() {
        //     dataService.getCustomersSummary($scope.currentPage - 1, $scope.pageSize)
        //     .then(function (data) {
        //         $scope.totalRecords = data.totalRecords;
        //         $scope.customers = data.results;
        //         filterCustomers(''); //Trigger initial filter
        //     }, function (error) {
        //         alert(error.message);
        //     });
        // }

    }
]);