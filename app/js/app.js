'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', ['dictControllers', 'dictFilters','dictServices','dictDirectives']);

  // The url of api service used to translate words or path to local mockDB
  dictApp.constant('apiUrl', '/mockDB');
  // Endpoint to get list of languages
  dictApp.constant('LanguageEndpoint', '/languages.json');
  // Endpoint to translate words
  dictApp.constant('translateEndpoint', '/translate/');
  // if mockDB is set to true, suffix .json is appended to requests
  dictApp.constant('mockDB', 'true');

  dictApp.config(['translationServiceProvider', 'apiUrl', 'LanguageEndpoint','translateEndpoint', 'mockDB',
    function(translationServiceProvider, apiUrl, LanguageEndpoint, translateEndpoint, mockDB) {
        translationServiceProvider.config(apiUrl, LanguageEndpoint, translateEndpoint, mockDB);
  }]);

})();
