(function(){
  var tweetDirectives = angular.module('tweetDirectives', []);

  // tweet panel directive
  // displayes tweet in specific format
  tweetDirectives.directive('tweetPanel', [function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/tweetPanel',
      scope: {
        tweet: '='
        // ,
        // whenClicked: '='
      }
    }
  }]);

})();

