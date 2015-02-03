'use strict';

/* Controllers */

(function() {
  var dictApp = angular.module('dictApp', []);
  
  dictApp.controller('LanguageCtrl', ['$scope', '$http', function($scope, $http){
      $http.get('http://private-9b43f-translateservice.apiary-mock.com/languages').success(function(data) {
        $scope.languages = data;
    });
  }]);
  
})();