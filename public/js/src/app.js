'use strict';

var glutApp = angular.module('glutApp', [
    'ngResource',
    'ngRoute',
    'glutSearchControllers',
    'glutResultsControllers',
    'glutHistoryControllers',
    'glutLatLngServices',
    'glutTwitterSearchServices',
    'glutMapServices',
    'glutHistoryServices',
    'ui.bootstrap',
    'ui.map'

]);


glutApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/search',
                controller: 'searchCtrl'
            })
            .when('/search/:searchId', {
                templateUrl: 'partials/searchResults',
                controller: 'resultsCtrl'
            })
            .when('/history',{
                templateUrl: 'partials/history',
                controller: 'historyCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

function onGoogleReady() {
  // console.log('google maps ready - loading angular glutApp');
  angular.bootstrap(document.body, ['glutApp']);
}