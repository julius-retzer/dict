'use strict';

/* Controllers */

(function() {
    var dictControllers = angular.module('dictControllers', ['dictServices']);

    dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', function($scope, translationService){

        translationService.getLanguages().then(function(){
            $scope.languages = translationService.languages
        })


        $scope.getWords = function(language) { translationService.getWords(language) };


    }]);

    dictControllers.controller('WordCtrl',['$scope', 'translationService', function($scope, translationService ){
        
        $scope.isEditing = false;

        
        $scope.saveWord = function(key, value, language) {
            translationService.save() //todo
            $scope.stopEditing();
        };
        
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