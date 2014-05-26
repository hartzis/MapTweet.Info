'use strict';

var glutApp = angular.module('glutApp', [
    'ngResource',
    'ngRoute',
    'glutControllers'

]);


latlongApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/index',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);