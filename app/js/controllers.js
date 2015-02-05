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

    dictControllers.controller('WordCtrl',['$scope', function($scope){
        
        $scope.isEditing = false;

        
        $scope.startEditing = function(){
          $scope.isEditing = true;  
        };
    
        $scope.stopEditing = function(){
          $scope.isEditing = false;  
        };
        
        
    }]);

})();