'use strict';

describe('Language controller', function() {
    var scope, translationService, createController, deferred, newWord;

    beforeEach(function() {
        var mockTranslationService = {};

        module('dictApp', function($provide) {
            $provide.value('translationService', mockTranslationService);
        });

        inject(function($q) {
            deferred = $q.defer();

            mockTranslationService.languages =  [
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
                }]
            }];



            mockTranslationService.getLanguages = jasmine.createSpy();
            mockTranslationService.getWords = jasmine.createSpy();
            mockTranslationService.addWord = jasmine.createSpy();


        });
    });

    beforeEach(inject(function($controller, $rootScope, _translationService_) {
        scope = $rootScope.$new();
        translationService = _translationService_;
        createController = function () {
            return $controller('LanguageCtrl',
                    {$scope: scope, translationService: translationService});
        };
        createController();
    }));

    it('should call function to fetch the language array on load', function() {
        expect(translationService.getLanguages).toHaveBeenCalled();
    });

    it('should create an empty new word', function() {
        expect(scope.newWord).toEqual({});
    });
    it('should call the function to fetch the words', function() {
        scope.getWords();
        scope.$digest();

        expect(translationService.getWords).toHaveBeenCalled();
    });


    it('it should call new word if the input is valid and empty the newWord object',
        function() {
            scope.newWord = 'new word';
            scope.addWord('slovak', true);
            scope.$digest();

            expect(translationService.addWord).toHaveBeenCalledWith('new word', 'slovak');
            expect(scope.newWord).toEqual({});
        }
    );
    it('it should not call new word if the input is not valid',
        function() {
            scope.addWord('new word', false);
            scope.$digest();

            expect(translationService.addWord).not.toHaveBeenCalled();
        }
    );
});
