'use strict';

/* Services */
(function() {

    var dictServices = angular.module('dictServices', []);

    dictServices.provider('translationService', function() {
        var apiUrl = null;

        this.setApiUrl = function(url) {
            apiUrl = url;
        };


        this.$get = ['$http', 'apiUrl', '$q', function ($http, apiUrl, $q) {

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
                
                var deferred = $q.defer();
                
                // look up the language object to assign words to
                var result = db.languages.filter(function(lang){ return lang.name === language})[0];
                
                // if words exist, serve from cache
                if (typeof result.words !== 'undefined') {
                    deferred.resolve(result.words);
                } else {
                    $http
                        .get(apiUrl + '/translate/' + language)
                        .then(function(response){
                            result.words = response.data;
                            deferred.resolve(response.data)
                    });
                }
                
                return deferred.promise;
                
            };
            
            
            //to add or delete word, we pass the corresponding language object, so we don't have to look it up manually
            db.addWord = function(word, language){
                delete language.words[word];
            };
            
            
            db.deleteWord = function(word, language){
                delete language.words[word];
            };


            return db;
        }];


    });

})();