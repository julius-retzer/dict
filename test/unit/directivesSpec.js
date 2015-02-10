'use strict';

describe('directive: svg-circle', function() {
  var element, scope;

  beforeEach(module('dictApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element =
    '<div class="editable" ng-click="edit()" ng-bind="value"></div><input ng-model="value"></input>' +
    '<button class="btn btn-primary btn-xs glyph-ok" ng-show="isEditing">' +
    '<span class="glyphicon glyphicon-ok"></span>' +
    '</button>' +
    '<button class="btn btn-danger btn-xs glyph-remove" ng-show="isEditing" ng-click="deleteWord(value, language)">' +
    '<span class="glyphicon glyphicon-remove"></span>' +
    '</button>';


    scope.value = 'testing words';

    element = $compile(element)(scope);
    scope.$digest();
  }));


  xit('should have been written better', function() {
      expect('My next directive').toBe('written much better and more testable');
    
  });
});
