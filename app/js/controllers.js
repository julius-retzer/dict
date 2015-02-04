'use strict';

/* Controllers */

(function() {
    var dictControllers = angular.module('dictControllers', []);

    dictControllers.controller('LanguageCtrl', ['$scope', '$http', function($scope, $http){
//        $http.get('http://private-9b43f-translateservice.apiary-mock.com/languages').success(function(data) {
//            $scope.languages = data;
//        });
        $scope.languages = ["english", "czech", "slovak", "german", "hungarian", "polish"]
    }]);
  
    
    
})();