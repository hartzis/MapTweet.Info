'use strict';

var mapTweetInfoApp = angular.module('mapTweetInfoApp', [
    'ngResource',
    'ngRoute',
    'searchControllers',
    'resultsControllers',
    'historyControllers',
    'latLngServices',
    'twitterSearchServices',
    'mapServices',
    'historyServices',
    'ngEnterDirectives',
    'ui.bootstrap',
    'ui.map'

]);


mapTweetInfoApp.config(['$routeProvider',
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
  angular.bootstrap(document.body, ['mapTweetInfoApp']);
}