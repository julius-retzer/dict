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
            
            db.languages = [];
            
            db.getLanguages = function(){
                return $http
                    .get(apiUrl + '/languages')
                    .then(function(response){
                        for (var i = 0; i < response.data.length; i++) {
                            db.languages.push({'name' : response.data[i]})
                        }
                    })
            };

            db.getWords = function(language){
                var result = db.languages.filter(function(lang){ return lang.name === language})[0];
                return $http
                    .get(apiUrl + '/translate/' + language)
                    .then(function(response){
                        result.words = response.data;
                });
            };



            return db;
        }];


    });

})();