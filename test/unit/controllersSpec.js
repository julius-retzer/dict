'use strict';

describe('Language controller', function() {
    var scope, translationService, $location;

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
            }]

            mockTranslationService.getLanguages = function() {
                var defer = $q.defer();

                defer.resolve(this.languages)

                return defer.promise;
            }
        });
    });

    beforeEach(inject(function($controller, $rootScope, _$location_, _translationService_) {
        scope = $rootScope.$new();
        $location = _$location_;
        translationService = _translationService_;

        spyOn('translationService', getLanguages)
        $controller('LanguageCtrl',
                    {$scope: scope, $location: $location, translationService: translationService});

        scope.$digest();
    }));

    it('should get the language array', function() {
        expect(translationService.getLanguages).toHaveBeenCalled();
    });
});
