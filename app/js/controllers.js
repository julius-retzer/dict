'use strict';


(function() {
    var dictControllers = angular.module('dictControllers', ['dictServices']);

    dictControllers.controller('LanguageCtrl', ['$scope', 'translationService', 'isEditingFactory',
        function($scope, translationService, isEditingFactory){

            $scope.getLanguages = function() {
                translationService.getLanguages();
                $scope.languages = translationService.languages;

            };

            $scope.getLanguages();


            $scope.getWords = function(language) {
                translationService.getWords(language);
            };


            $scope.newWord = {};

            $scope.addWord = function(language, isValid) {
                if (isValid && !isEditingFactory.isEditingGlobal) {
                    translationService.addWord($scope.newWord, language);
                    $scope.newWord = {};
                }
        };

    }]);

    dictControllers.controller('ButtonCtrl', ['$scope', 'translationService',
        function($scope, translationService){

            $scope.deleteWord = function(key, language) {
                translationService.deleteWord(key, language);

        };
    }]);
})();
