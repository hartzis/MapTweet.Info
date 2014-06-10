var historyControllers = angular.module('historyControllers', []);

historyControllers.controller('historyCtrl', ['$scope', '$modal', 'historyFactory',
  function($scope, $modal, historyFactory) {
    $scope.user = {};

    historyFactory.retrieveSearchHistory()
      .then(function(data) {
        // console.log('got this back-', data);
        $scope.user = data;
      });

    // confirm remove all modal
    $scope.openConfirmRemoveAll = function() {
      var modalInstance = $modal.open({
        templateUrl: 'confirmRemoveAll.html',
        controller: 'confirmRemoveCtrl',
        size: 'sm'
      });
      // if confirm then remove all
      modalInstance.result.then(function() {
        console.log('got confirmed');
        // historyFactory.removeAll()
        //   .then(function(response) {
        //     if (response = 'removed'){
        //       $scope.user.geo_searches = [];
        //   }
        // })        
      })
    }

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