'use strict';

/* Controllers */

(function() {
  var dictControllers = angular.module('dictControllers', ['dictServices']);

  dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', function($scope, translationService){
    
    $scope.activeLanguage = 'english'
    
    translationService.getLanguages().success(function(response){
      $scope.languages = response;
    })

    $scope.getWords = translationService.getWords($scope.activeLanguage).success(function(response){
      $scope.words = response;
    })



    $scope.setLanguage = function(language) {
      $scope.activeLanguage = language;
    };


  }]);


})();