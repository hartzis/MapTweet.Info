(function(){
  angular.module('tweetDirectives', [])

  // tweet panel directive
  // displayes tweet in specific format
  .directive('tweetPanel', [function(){
    return {
      restrict: 'E',
      templateUrl: 'html/templates/tweetPanel.html',
      scope: {
        tweet: '='
      }
    }
  }]);

})();

