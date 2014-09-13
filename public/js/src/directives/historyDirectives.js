(function () {
  angular.module('historyDirectives', [])

  .directive('searchHistory', [ 
    function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/searchHistory',
        scope: {
          geoSearches: '=geoSearches'
        },
        controller: ['historyFactory', 
          function(historyFactory) {
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