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

            var db ={}; 
            
            db.dict = [];
            
            db.getLanguages = function(){
                return $http.get(apiUrl + '/languages')
                    .then(function(response){
                        angular.copy(response.data, db.dict);
                    })
            };

            db.getWords = function(language){
                return $http.get(apiUrl + '/translate/' + language)
                    .then(function(response){
                        var lanaguageIndex = db.dict.indexOf(language);
                    
                });
            };



            return db;
        }];


    });

})();