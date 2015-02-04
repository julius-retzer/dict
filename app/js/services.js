'use strict';

/* Services */
(function() {
  
  var dictServices = angular.module('dictServices', []);

  dictServices.provider('translationService', function() {
    var apiUrl = null;

    this.setApiUrl = function(url) {
      apiUrl = url;
    };


    this.$get = ['$http', 'apiUrl', function ($http, apiUrl) {
      return {
        getLanguages : function(){
          return $http.get(apiUrl + '/languages');
          }
        }
      
    }];
      

  });
  
})();