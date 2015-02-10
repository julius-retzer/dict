'use strict';

/* Directives */

var dictApp = angular.module('dictDirectives', []);



dictApp.directive('editable',['isEditingFactory', function (isEditingFactory) {
    return {
        restrict: 'E',
        controller: 'ButtonCtrl',
        scope: {
            value: '=',
            language: '='
        },
        templateUrl: 'partials/editable.html',
        link: function (scope, element, attrs) {

            var inputElement = angular.element(element.children()[1]);
            var okButton = angular.element(element.children()[2]);
            var deleteButton = angular.element(element.children()[3]);

            element.addClass('editable');

            isEditingFactory.isEditingGlobal = false;
            scope.isEditing = false;

            scope.edit = function () {
                if (isEditingFactory.isEditingGlobal === false) {

                    isEditingFactory.isEditingGlobal = true;
                    scope.isEditing = true;

                    // We control display through CSS
                    element.addClass('active');

                    inputElement[0].focus();
                }
            };

            // When we press enter or the keyup button, we're done editing.
            scope.stopEdit = function (e) {
                if (e.type === 'click' || e.keyCode === 13) {
                    isEditingFactory.isEditingGlobal = false;
                    scope.isEditing = false;
                    element.removeClass('active');
                    scope.$apply();
                }
            };

            inputElement.on('keyup', scope.stopEdit);
            okButton.add(deleteButton).click(scope.stopEdit);

        }
    };
}]);
