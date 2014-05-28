'use strict';

var glutApp = angular.module('glutApp', [
    'ngResource',
    'ngRoute',
    'glutSearchControllers',
    'glutResultsControllers',
    'glutLatLngServices',
    'glutTwitterSearchServices',
    'ui.bootstrap'

]);


glutApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'searchCtrl'
            })
            .when('/search/:searchId', {
                templateUrl: 'partials/searchResults',
                controller: 'resultsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);