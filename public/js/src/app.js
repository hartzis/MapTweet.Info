'use strict';
(function(){
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

  // setup angular single page routes
  mapTweetInfoApp.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
          $routeProvider
              .when('/', {
                  templateUrl: 'partials/search',
                  controller: 'searchCtrl'
              })
              .when('/search/:searchId', {
                  templateUrl: 'partials/searchResults',
                  controller: 'resultsCtrl'
              })
              .when('/history', {
                  templateUrl: 'partials/history',
                  controller: 'historyCtrl'
              })
              .when('/about', {
                  templateUrl: 'partials/about'
              })
              // .when('/auth/logout', {
              //     templateUrl: 'auth/logout'
              //     // resolve: {
              //     //   factory: 'logoutCtrl'
              //     //   }
              //     // controller: function () {
              //     //     $window.location.assign('/auth/logout');
              //     // }
              // })
              .otherwise({
                  redirectTo: '/'
              });
          // remove # in the address bar
          $locationProvider.html5Mode(true);
      }
  ]);
})();


function onGoogleReady() {
  // console.log('google maps ready - loading angular glutApp');
  angular.bootstrap(document.body, ['mapTweetInfoApp']);
}