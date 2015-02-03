'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', []);

  dictApp.controller('LanguageController', ['$scope', function($scope){
    $scope.test = 'Hello';
  }]);
})();