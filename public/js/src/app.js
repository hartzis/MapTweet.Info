'use strict';

var glutApp = angular.module('glutApp', [
    'ngResource',
    'ngRoute',
    'glutControllers'

]);


glutApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);