'use strict';

/* Controllers */

(function() {
    var dictControllers = angular.module('dictControllers', ['dictServices']);

    dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', '$log', function($scope, translationService, $log){
        
        $scope.newWord = {};
        
        translationService.getLanguages().then(function(){
            $scope.languages = translationService.languages
        })


        $scope.getWords = function(language) { translationService.getWords(language) };
        
                
        $scope.addWord = function(language) {
            console.log(language);
            translationService.addWord($scope.newWord, language);
            $scope.newWord = {};
            };

    }]);

    dictControllers.controller('WordCtrl',['$scope', 'translationService', function($scope, translationService ){
        
        $scope.isEditing = false;

        
        
        $scope.deleteWord = function(key, language) {
            translationService.deleteWord(key, language) //todo
            $scope.stopEditing();
        };
        
        $scope.startEditing = function(key, value){
            $scope.isEditing = true;
            $scope.orig = angular.copy()
        };
    
        $scope.stopEditing = function(){
          $scope.isEditing = false;  
        };
        
        
    }]);

})();