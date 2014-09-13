(function() {
  var historyControllers = angular.module('historyControllers', []);

  historyControllers.controller('historyCtrl', ['$scope', '$modal', 'historyFactory', 'searchHistory',
    function($scope, $modal, historyFactory, searchHistory) {
      // console.log('got search history in resolve-', searchHistory);
      $scope.user = searchHistory;
      $scope.submittingRemoveAll = false;

      // confirm remove all modal
      $scope.openConfirmRemoveAll = function() {
        var modalInstance = $modal.open({
          templateUrl: 'confirmRemoveAll.html',
          controller: 'confirmRemoveCtrl',
          size: 'sm'
        });
        // if confirm then remove all
        modalInstance.result.then(function() {
          $scope.submittingRemoveAll = true;
          historyFactory.removeAll()
            .then(function(response) {
              if (response = 'removed'){
                $scope.user.geo_searches = [];
                $scope.submittingRemoveAll = false;
            }
          })        
        })
      }

    }]);

  //modal controller
  historyControllers.controller('confirmRemoveCtrl', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
      // confirm delete
      $scope.confirmRemoveAll = function() {
        // console.log('confirmed remove all');
        $modalInstance.close()
      }

      // cancel out
      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
        // console.log('canceled remove all');
      }
  }])
})();
