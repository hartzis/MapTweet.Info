(function() {
  var app = angular.module('mapDirectives', []);

  // create directive with same name as uiMap, so that the height can be dynamically set based on window
  app.directive('uiMap', [ '$window',
    function($window) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          // console.log('canvasContainer-', 'scope-', scope, 'element-', element, 'attrs-', attrs);
          // window.tempEle = element;

          // get height from window and set map height
          element.height($window.outerHeight - 200);
        }
      }
    }])
})();