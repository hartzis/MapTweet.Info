'use strict';

var glutApp = angular.module('glutApp', [
    'ngResource',
    'ngRoute',
    'glutSearchControllers',
    'glutResultsControllers',
    'glutLatLngServices',
    'glutTwitterSearchServices',
    'ui.bootstrap',
    'ui.map'

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

function onGoogleReady() {
  console.log('google maps ready - loading angular glutApp');
  angular.bootstrap(document.body, ['glutApp']);
}