'use strict';

/* Services */
(function() {

    var dictServices = angular.module('dictServices', []);

    dictServices.provider('translationService', function() {
        var apiUrl;
        var languageEndpoint;
        var translateEndPoint;
        this.config = function(apiUrl, languageEndpoint, translateEndpoint, mockDB) {
            apiUrl = apiUrl;
            languageEndpoint = languageEndpoint;
            translateEndPoint = translateEndpoint;
            mockDB = mockDB;
        };


        this.$get = ['$http', 'apiUrl', 'LanguageEndpoint', 'translateEndpoint', '$q', 'mockDB',
            function($http, apiUrl, languageEndpoint, translateEndpoint, $q, mockDB) {

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
                        var url = apiUrl + translateEndPoint + language;
                        url = mockDB ? url + '.json' : url;
                        $http
                            .get(url)
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
                                        });
                                    }
                                }
                                result.words = newWordArray;
                                deferred.resolve(newWordArray);

                            });
                    }

                    return deferred.promise;

                };


                // to add or delete word, we also pass the corresponding language object, to optimize search
                db.addWord = function(newWord, language) {
                    language.words.unshift({
                        key: newWord.key,
                        translation: newWord.translation,
                        createdOn: Date.now()
                    });
                };


                db.deleteWord = function(word, language) {
                    // find the word in given language
                    var result = language.words.filter(function(_word) {
                        return _word.key === word || _word.translation === word;
                    })[0];
                    // find its index and pop it off of array
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
        };
    });

})();
