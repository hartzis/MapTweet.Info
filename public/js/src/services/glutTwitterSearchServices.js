var glutTwitterSearchServices = angular.module('glutTwitterSearchServices', []);

glutTwitterSearchServices.factory('factoryTwitterSearch', ['$http', '$location',
  function($http, $location) {
    return {
      postTwitterSearch: function(search) {
        console.log(search);
        $http.post('/api/search', search)
        .success(function(savedSearch) {
            console.log('savedSearch-', savedSearch);
            var searchId = savedSearch._id;
            $location.path('/search/'+searchId);
        });
      }
    }
}])