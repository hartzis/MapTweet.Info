var glutTwitterSearchServices = angular.module('glutTwitterSearchServices', []);

glutTwitterSearchServices.factory('factoryTwitterSearch', ['$http', 
  function($http) {
    return {
      postTwitterSearch: function(searchQuery) {
        console.log(searchQuery);
      }
    }
}])