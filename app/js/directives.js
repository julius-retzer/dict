'use strict';

/* Directives */

var dictApp = angular.module('dictDirectives', []);



dictApp.directive('editable', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'partials/editable.html',
        link: function (scope, element, attrs) {

            var inputElement = angular.element(element.children()[1]);
            var spanElement = element.children()[0]
            element.addClass('editable');

            scope.isEditing = false;

            scope.edit = function () {
                scope.isEditing = true;

                // We control display through a class on the directive itself. See the CSS.
                element.addClass('active');


                inputElement[0].focus();
            };

            // When we leave the input, we're done editing.
            inputElement.bind('blur keyup', function (e) {
                if (e.type === 'blur' || e.keyCode === 13) {
                    scope.isEditing = false;
                    element.removeClass('active');
                    scope.$apply();
                }
            });

            function resizeInput() {
                $(this).attr('size', $(this).val().length);
            }

            inputElement.focus(resizeInput).keyup(resizeInput).each(resizeInput);

        }
    };
});