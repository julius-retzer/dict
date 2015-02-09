'use strict';

/* Services */
(function() {

    var dictServices = angular.module('dictServices', []);

    dictServices.provider('translationService', function() {
        var apiUrl = null;
        var languageEndpoint;
        var translateEndPoint;
        this.config = function(apiUrl, languageEndpoint, translateEndpoint) {
            apiUrl = apiUrl;
            languageEndpoint = languageEndpoint;
            translateEndPoint = translateEndpoint;
        };


        this.$get = ['$http', 'apiUrl', 'LanguageEndpoint', 'translateEndpoint', '$q',
            function($http, apiUrl, languageEndpoint, translateEndpoint, $q) {

                var db = {};

                db.languages = [];

                db.getLanguages = function() {
                    return $http
                        .get(apiUrl + languageEndpoint)
                        .then(function(response) {
                            // create array of of languages with name of the language as property
                            for (var i = 0; i < response.data.length; i++) {
                                db.languages.push({
                                    'name': response.data[i]
                                });
                            }
                        });
                };

                db.getWords = function(language) {

                    // create new promise
                    var deferred = $q.defer();

                    // look up the language object to assign words to
                    var result = db.languages.filter(function(lang) {
                        return lang.name === language;
                    })[0];

                    // if words already exist, serve from cache
                    if (typeof result.words !== 'undefined') {
                        deferred.resolve(result.words);
                    } else {
                        $http
                            .get(apiUrl + translateEndPoint + language)
                            .then(function(response) {
                                // construct our data structure where each pair is a object in array
                                var newWordArray = [];
                                for (var key in response.data) {
                                    // check if the property is not inherited
                                    if (response.data.hasOwnProperty(key)) {
                                        newWordArray.push({
                                            key: key,
                                            translation: response.data[key],
                                            createdOn: 0
                                        })
                                    }
                                }
                                result.words = newWordArray;
                                deferred.resolve(newWordArray);

                            });
                    }

                    return deferred.promise;

                };


                //to add or delete word, we also pass the corresponding language object, so we don't have to look it up manually
                db.addWord = function(newWord, language) {
                    language.words.unshift({
                        key: newWord.key,
                        translation: newWord.translation,
                        createdOn: Date.now()
                    });
                };


                db.deleteWord = function(word, language) {
                    // find the word in the given language
                    var result = language.words.filter(function(_word) {
                        return _word.key === word || _word.translation === word;
                    })[0];
                    // find its index and pop it from array
                    var resultIndex = language.words.indexOf(result);
                    language.words.splice(resultIndex, 1);
                };


                return db;
            }
        ];


    });

    // To share editing state between isolated directives
    dictServices.factory('isEditingFactory', function() {
        return {
            isEditingGlobal: null
        }
    })

})();
