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

dictApp.directive("editable", function() {
  return {
    restrict: "A",
    scope: {content : '=content'},
    templateUrl: "partials/editable.html"
  };
});


dictApp.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});