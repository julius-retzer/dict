'use strict';

/* Controllers */

(function() {
  var dictControllers = angular.module('dictControllers', ['dictServices']);

  dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', function($scope, translationService){
    
    translationService.getLanguages().success(function(response){
      $scope.languages = response;
    })
    console.log($scope.languages)
  }]);

})();