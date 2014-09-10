(function() {
  angular.module('mapDirectives', [])

  // create directive with same name as uiMap, so that the height can be dynamically set based on window
  directive('uiMap', [ '$window',
    function($window) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {

          // get height from window and set map height
          element.height($window.outerHeight - 200);
        }
      }
    }])
})();