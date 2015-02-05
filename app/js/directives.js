'use strict';

/* Directives */

var dictApp = angular.module('dictDirectives',[])

dictApp.directive("words", function() {
  return {
    restrict: "E",
    templateUrl: "partials/words.html",
    controller: "WordCtrl"
  }
});

dictApp.directive("languages", function() {
  return {
    restrict: "A",
    templateUrl: "partials/languages.html"
  }
});