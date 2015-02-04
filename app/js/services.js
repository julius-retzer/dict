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
      
      var db = {};
      
      var obj ={}; 
      
      obj.getLanguages = function(){
        return $http.get(apiUrl + '/languages');
      };
      
      obj.getWords = function(language){
        return $http.get(apiUrl + '/translate/' + language);
      };
      
      return obj;
    }];


  });

})();