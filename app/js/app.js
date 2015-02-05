'use strict';

/* App Module */

(function() {
  var dictApp = angular.module('dictApp', ['ngResource','dictControllers', 'dictFilters','dictServices','dictDirectives']);

  // The url of api service used to translate words
  dictApp.constant('apiUrl', 'http://private-9b43f-translateservice.apiary-mock.com');

  dictApp.config(['translationServiceProvider', 'apiUrl', function(translationServiceProvider, apiUrl) {
    translationServiceProvider.setApiUrl(apiUrl);
  }]);
  
//  dictApp.config(['$httpProvider', function ($httpProvider) {
//            // enable http caching
//           $httpProvider.defaults.cache = true;
//      }])

})();