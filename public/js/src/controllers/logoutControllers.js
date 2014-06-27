// (function() {
//   var logoutControllers = angular.module('logoutControllers', []);

//   logoutControllers.controller('logoutCtrl', ['$q', '$location', '$http',
//     function ($q, $location, $http) {
//       var deferred = $q.defer();
//       console.log('logoutCtrl wrking');
//       $http.post('/auth/logout')
//           .success(function (data, status, headers, config) {
//               console.log('success for logout');
//               deferred.reject();
//               $location.url('/auth/login');
//           });
//       return deferred.promise;
//     }
//   ]);
// })();