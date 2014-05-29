var glutTwitterSearchServices = angular.module('glutTwitterSearchServices', []);

glutTwitterSearchServices.factory('factoryTwitterSearch', ['$http', '$location',
  function($http, $location) {
    return {
      // send twitter search to be saved in database
      postTwitterSearch: function(search) {
        console.log('saving this search-', search);
        $http.post('/api/search', search)
        .success(function(savedSearch) {
            console.log('savedSearch-', savedSearch);
            var searchId = savedSearch._id;
            $location.path('/search/'+searchId);
        });
      },
      // find requested twitter search and perform api call
      // recieve array of tweets back
      getTweetsBySearchId: function(searchId) {
        console.log('finding this search and getting tweets-', searchId);
        return $http.get('/api/search?searchId='+searchId)
            .then(function(res) {
              console.log('found-', res);
              return res.data;
            })
      }
    }
}])