'use strict';

/* Controllers */

(function() {
  var dictControllers = angular.module('dictControllers', ['dictServices']);

  dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', function($scope, translationService){

    translationService.getLanguages().then(function(){
        $scope.languages = translationService.dict
    })
    
    
    $scope.getWords = function(language) {
      translationService.getWords(language).success(function(response){
        $scope.words = response;
      });
    };


  }]);


})();