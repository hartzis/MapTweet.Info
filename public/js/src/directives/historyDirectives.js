(function () {
  angular.module('historyDirectives', [])

  /**************************
  search-history: list of previous searches completed
  
  --- example use in jade ---
  search-history(geo-searches="geoSearches", search-filter="searchFilter")

  geo-searches: array of all previous searches
  search-filter: $scope.model that is used to auto filter searches
  
  ******************************/
  .directive('searchHistory', [ 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'html/templates/searchHistory.html',
        scope: {
          geoSearches: '=geoSearches',
          searchFilter: '=searchFilter'
        },
        controller: ['$scope', 'historyFactory', 
          function($scope, historyFactory) {
            console.log('directive geoSearches-', $scope.geoSearches);
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
                    $scope.geoSearches.splice($scope.geoSearches.indexOf(search),1);
                  }
                })
            }
          }]
      }
    }])

})();