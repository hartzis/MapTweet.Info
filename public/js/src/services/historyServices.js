var historyServices = angular.module('historyServices', []);

historyServices.factory('historyFactory', ['$http', '$location',
  function($http, $location) {
    return {
      removeAll: function() {
        console.log('remove all factory triggered');
        // remove all searchs from users geo_searches
        // return $http.delete('/api/search/all')
        //   .then(function(data) {
        //     if (data.status === 200){
        //       if (data.data === 'removed') {
        //         return 'removed';
        //       }
        //     }
        //   })
      },
      retrieveSearchHistory: function() {
        return $http.get('/api/search/history')
                  .then(function(res) {
                    return res.data;
                  })
      },
      copyToSearch: function(search) {
        // send user to $location.path('/').search({location: location, radius: radius});
        $location.path('/').search({
          location: search.location,
          radius: search.radius,
          radiusUnit: search.radiusUnit,
          query: search.query,
          latitude: search.latitude,
          longitude: search.longitude
        });
      },
      performSearch: function(searchId) {
        // send user to /search/searchId
        $location.path('/search/'+searchId);
      },
      removeSearch: function(searchId) {
        // remove the search from users geo_searches
        return $http.delete('/api/search', {params: {searchId: searchId}})
          .then(function(data) {
            if (data.status === 200){
              if (data.data === 'removed') {
                return 'removed';
              }
            }
          })
      }
    }
  }])