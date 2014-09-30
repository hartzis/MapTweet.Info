(function() {
  angular.module('navControllerModule', [])

  .controller('navCtrl', ['$scope', '$http', 
    function($scope, $http) {

      // get user info
      $http.get('/api/user')
        .success(function(data) {
          $scope.user = data;
        })

    }])
})();