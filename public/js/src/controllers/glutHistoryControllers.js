var glutHistoryControllers = angular.module('glutHistoryControllers', []);

glutHistoryControllers.controller('historyCtrl', ['$scope', 'historyFactory',
  function($scope, historyFactory) {
    $scope.searches = [];

    historyFactory.retrieveSearchHistory()
      .then(function(data) {
        console.log('got this back-', data);
      })


    // if click on search, send to search page with ?query string
    // example: ?location=paris&radius=25
    // set $location.path('/').search({location: location, radius: radius});
  }])