'use strict';

/* Controllers */

(function() {
  var dictControllers = angular.module('dictControllers', ['dictServices']);

  dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', function($scope, translationService){

    $scope.activeLanguage = 'english';

    translationService.getLanguages().success(function(response){
      $scope.languages = response;
    });

    $scope.getWords = function(language) {
      translationService.getWords(language).success(function(response){
        $scope.words = response;
      });
    };


  }]);


})();