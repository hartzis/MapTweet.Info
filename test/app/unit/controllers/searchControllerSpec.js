'use strict';

describe('test search controller', function() {

  beforeEach(module('mapTweetInfoApp'));
  beforeEach(module('twitterSearchServices'));
  beforeEach(module('latLngServices'));

  describe('searchCtrl', function(){
    var scope, ctrl, $httpBackend, $browser, $location;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    //   $httpBackend = _$httpBackend_;
    //   $httpBackend.expectGET('phones/phones.json').
    //       respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      $location = scope.$service('$location');
      $browser = scope.$service('$browser');
      ctrl = $controller('searchCtrl', {$scope: scope});
    }));


    it('should have default variables set', function() {
      // expect(scope.phones).toEqualData([]);
      // $httpBackend.flush();

      expect(scope.counts).toEqualData(
        [{label: '25 Tweets', value: '25'},{label: '50 Tweets', value: '50'},{label: '75 Tweets', value: '75'},{label: '150 Tweets', value: '150'}]
      );
    });


    // it('should set the default value of orderProp model', function() {
    //   expect(scope.orderProp).toBe('age');
    // });
  });


});