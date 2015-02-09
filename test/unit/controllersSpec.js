'use strict';

describe('Language controller', function() {
    var scope, translationService, createController;

    beforeEach(function() {
        var mockTranslationService = {};
        module('dictApp', function($provide) {
            $provide.value('translationService', mockTranslationService);
        });

        inject(function($q) {
            mockTranslationService.languages = [
                {
                    name: 'slovak'
                },
                {
                    name: 'czech'
                }
            ];

            mockTranslationService.languagesWithWords = [{
                name: 'slovak',
                words: [{
                    key: 'Car',
                    translation: 'Auto',
                    createdOn: 0
                }, {
                    key: 'Flower',
                    translation: 'Kvet',
                    createdOn: 0
                }]
            }, {
                name: 'czech',
                words: {
                    key: 'Plaza',
                    translation: 'Namesti',
                    createdOn: 0
                }
            }];

            mockTranslationService.getLanguages = function() {
                var deferred = $q.defer();

                deferred.resolve(this.languages);
                return deferred.promise;
            };
        });
    });

    beforeEach(inject(function($controller, $rootScope, _translationService_) {
        scope = $rootScope.$new();
        translationService = _translationService_;
        createController = function () {
            return $controller('LanguageCtrl',
                    {$scope: scope, translationService: translationService});
        };
        scope.$digest();
    }));

    it('should get the language array', function() {
        spyOn(translationService, 'getLanguages');
        createController();
        expect(translationService.getLanguages).toHaveBeenCalled();
    });
});
