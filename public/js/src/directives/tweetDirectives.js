(function(){
  var tweetDirectives = angular.module('tweetDirectives', []);

  
  tweetDirectives.directive('tweetPanel', [function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/tweetPanel',
      scope: {
        tweet: '='
      }

    }
  }]);



})();

