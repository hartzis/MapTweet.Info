
var glutServices = angular.module('glutServices', []);

glutServices.factory('factoryLatLng', ['$http', function($http) {
  return {
    getLatLng: function(address) {
        
      console.log('factory getLatLng-', address);

          // perform the ajax request then process what is returned, and forward recompiled info
        // function getPagedResource(baseResource, pageIndex, pageSize) {
        //     var resource = baseResource;
        //     resource += (arguments.length == 3) ? buildPagingUri(pageIndex, pageSize) : '';
        //     return $http.get(serviceBase + resource).then(function (response) {
        //         var custs = response.data;
        //         extendCustomers(custs);
        //         return {
        //             totalRecords: parseInt(response.headers('X-InlineCount')),
        //             results: custs
        //         };
        //     });
        // }
      
    },
    queryAddresses: function(address) {
      console.log('querying-', address);
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          sensor: false
          }
      }).then(function(res){
        var addresses = [];
          angular.forEach(res.data.results, function(item){
            addresses.push(item.formatted_address);
          });
        return addresses;
      });
    }
  }
}])