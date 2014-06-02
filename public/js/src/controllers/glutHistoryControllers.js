var glutHistoryControllers = angular.module('glutHistoryControllers', []);

glutHistoryControllers.controller('historyCtrl', ['$scope', 'historyFactory',
  function($scope, historyFactory) {
    $scope.user = {};

    historyFactory.retrieveSearchHistory()
      .then(function(data) {
        console.log('got this back-', data);
        $scope.user = data;
      });

    $scope.performSearch = function(search) {
      historyFactory.performSearch(search._id);
    };

    $scope.copyToSearch = function(search) {
      historyFactory.copyToSearch(search);
    }

    $scope.removeSearch = function(search) {
      historyFactory.removeSearch(search._id)
        .then(function(response) {
          if (response === 'removed'){
            $scope.user.geo_searches.splice($scope.user.geo_searches.indexOf(search),1);
          }
        })
    }

    // if click on 'search: id', re-peform search
    // if click on 'copy to search', send to search page with ?query string
    // example: ?location=paris&radius=25
    // set $location.path('/').search({location: location, radius: radius});
  }])