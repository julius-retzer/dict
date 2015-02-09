'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', ['ngResource','dictControllers', 'dictFilters','dictServices','dictDirectives']);

  // The url of api service used to translate words
  dictApp.constant('apiUrl', 'http://private-9b43f-translateservice.apiary-mock.com');
  dictApp.constant('LanguageEndpoint', '/languages');
  dictApp.constant('translateEndpoint', '/translate/');

  dictApp.config(['translationServiceProvider', 'apiUrl', 'LanguageEndpoint','translateEndpoint',
    function(translationServiceProvider, apiUrl, LanguageEndpoint, translateEndpoint) {
        translationServiceProvider.config(apiUrl, LanguageEndpoint, translateEndpoint);
  }]);

//  dictApp.config(['$httpProvider', function ($httpProvider) {
//            // enable http caching
//           $httpProvider.defaults.cache = true;
//      }])

})();
