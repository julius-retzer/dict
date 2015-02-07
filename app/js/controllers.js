'use strict';

/* Controllers */

(function() {
    var dictControllers = angular.module('dictControllers', ['dictServices']);

    dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', '$log', function($scope, translationService, $log){
        
        
        translationService.getLanguages().then(function(){
            $scope.languages = translationService.languages;
        })


        $scope.getWords = function(language) { 
            translationService.getWords(language)
        };
        
        
        $scope.newWord = {};
                
        $scope.addWord = function(language) {
            translationService.addWord($scope.newWord, language);
            $scope.newWord = {};
            };

        $scope.deleteWord = function(key, language) {
            translationService.deleteWord(key, language) //todo
            
        };
    }]);


})();