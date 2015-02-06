'use strict';

/* Directives */

var dictApp = angular.module('dictDirectives',[]);

//dictApp.directive("words", function() {
//  return {
//    restrict: "E",
//    templateUrl: "partials/words.html",
//    controller: "WordCtrl"
//  };
//});
//
dictApp.directive("languages", function() {
  return {
    restrict: "A",
    templateUrl: "partials/languages.html"
  };
});

//dictApp.directive("editable", function() {
//  return {
//    restrict: "A",
//    scope: {content : '=content'},
//    templateUrl: "partials/editable.html"
//  };
//});


dictApp.directive('editable', function () {
    return {
        restrict: 'E',
        scope: {
            value: '='
        },
        templateUrl: 'partials/editable.html',
        link: function ($scope, element, attrs) {
            // Let's get a reference to the input element, as we'll want to reference it.
            var inputElement = angular.element(element.children()[1]);

            // This directive should have a set class so we can style it.
            element.addClass('editable');

            // Initially, we're not editing.
            $scope.editing = false;

            // ng-click handler to activate edit-in-place
            $scope.edit = function () {
                $scope.isEditing = true;

                // We control display through a class on the directive itself. See the CSS.
                element.addClass('active');

                // And we must focus the element. 
                // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function, 
                // we have to reference the first element in the array.
                inputElement[0].focus();
            };
            
            // When we leave the input, we're done editing.
            inputElement.bind('blur keyup', function (e) {
                if (e.type === 'blur' || e.keyCode === 13){
                    $scope.isEditing = false;
                    element.removeClass('active');
                }
            });
        }
    };
});

