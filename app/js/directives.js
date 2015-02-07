'use strict';

/* Directives */

var dictApp = angular.module('dictDirectives', []);



dictApp.directive('editable',['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'partials/editable.html',
        link: function (scope, element, attrs) {

            var inputElement = angular.element(element.children()[1]);
            
            element.addClass('editable');

            $rootScope.isEditingGlobal = false;
            scope.isEditing = false;

            scope.edit = function () {
                if ($rootScope.isEditingGlobal === false) {
                    
                    $rootScope.isEditingGlobal = true;
                    scope.isEditing = true;
                    
                    // We control display through a class on the directive itself. See the CSS.
                    element.addClass('active');


                    inputElement[0].focus();
                    }
            };

            // When we leave the input, we're done editing.
            inputElement.on('keyup', function (e) {
                if (e.type === 'blur' || e.keyCode === 13) {
                    
                    $rootScope.isEditingGlobal = false;
                    scope.isEditing = false;
                    element.removeClass('active');
                    scope.$apply();
                }
            });
            
            //TODO: Only one editable at time

        }
    };
}]);