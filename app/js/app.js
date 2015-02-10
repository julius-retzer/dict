'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', ['ngResource','dictControllers', 'dictFilters','dictServices','dictDirectives']);

  // The url of api service used to translate words
  dictApp.constant('apiUrl', '/mockDB');
  dictApp.constant('LanguageEndpoint', '/languages.json');
  dictApp.constant('translateEndpoint', '/translate/');

  dictApp.config(['translationServiceProvider', 'apiUrl', 'LanguageEndpoint','translateEndpoint',
    function(translationServiceProvider, apiUrl, LanguageEndpoint, translateEndpoint) {
        translationServiceProvider.config(apiUrl, LanguageEndpoint, translateEndpoint);
  }]);

})();
