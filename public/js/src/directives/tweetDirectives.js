(function(){
  var tweetDirectives = angular.module('tweetDirectives', []);

  tweetDirectives.directive('tweetPanel', [function(){
    return {
      restrict: 'E',
      template: '
      <div ng-repeat="tweet in results.tweets|filter:{ text: searchTextAll }" class="row panel panel-info tweet">
        <div class="col-xs-2 text-center"><img ng-src="{{tweet.user.profile_image_url}}" class="profile-img"/></div>
        <div class="col-xs-10">
          <div class="row">
            <div class="col-xs-12">
              <h5>{{tweet.user.name}}&nbsp<a ng-href="http://www.twitter.com/{{tweet.user.screen_name}}" target="_blank" class="small">@{{tweet.user.screen_name}}</a><span class="small pull-right date-info">&nbsp&nbsp&nbsp&nbsp{{tweet.created_at}}</span></h5>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <div ng-bind-html="tweet.text"></div>
            </div>
          </div>
        </div>
      </div>'

    }
  }]);

})();
