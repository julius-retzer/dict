'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', ['dictControllers', 'dictFilters','dictServices','dictDirectives']);

  // The url of api service used to translate words or path to local mockDB
  // use '/mockDB' to use local DB
  dictApp.constant('apiUrl', 'http://private-anon-33342b00d-translateservice.apiary-mock.com');
  // Endpoint to get list of languages
  // '/languages.json' for mockDB
  dictApp.constant('LanguageEndpoint', '/languages');
  // Endpoint to translate words
  dictApp.constant('translateEndpoint', '/translate/');
  // if mockDB is set to true, suffix .json is appended to requests
  dictApp.constant('mockDB', 'false');

  dictApp.config(['translationServiceProvider', 'apiUrl', 'LanguageEndpoint','translateEndpoint', 'mockDB',
    function(translationServiceProvider, apiUrl, LanguageEndpoint, translateEndpoint, mockDB) {
        translationServiceProvider.config(apiUrl, LanguageEndpoint, translateEndpoint, mockDB);
  }]);

})();
