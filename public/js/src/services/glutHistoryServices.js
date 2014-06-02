var glutHistoryServices = angular.module('glutHistoryServices', []);

glutHistoryServices.factory('historyFactory', ['$http', '$location',
  function($http, $location) {
    return {
      retrieveSearchHistory: function() {
        return $http.get('/api/search/history')
                  .then(function(data) {
                    return data;
                  })
      },
      copyToSearch: function(search) {
        // send user to $location.path('/').search({location: location, radius: radius});
      },
      performSearch: function(searchId) {
        // send user to /search/searchId
      }
    }
  }])