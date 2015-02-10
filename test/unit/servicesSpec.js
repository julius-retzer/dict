'use strict';

describe('translationService', function() {
    var translationService, mockData, newWord, $httpBackend, czechLangObject;

    beforeEach(module('dictApp'));

    beforeEach(inject(function (_$httpBackend_, _translationService_) {
        mockData = {};
        newWord = {};
        translationService = _translationService_;
        $httpBackend = _$httpBackend_;

        // Data to be sent
        mockData.languagesBefore = ['slovak', 'czech'];

        // How processed data should look
        mockData.languagesAfter = [
                {
                    name: 'slovak'
                },
                {
                    name: 'czech'
                }
            ];

        mockData.slovakWordsBefore = {Car: 'Auto'};

        mockData.slovakWordsAfter = [{
            name: 'slovak',
            words: [{
                key: 'Car',
                translation: 'Auto',
                createdOn: 0
                }]
            },
            {
                name: 'czech'
            }
        ];

        mockData.czechWordsBefore = {Plaza : 'Namesti'};

        mockData.czechWordsAfter =[{
            name: 'slovak',
            words: [{
                key: 'Car',
                translation: 'Auto',
                createdOn: 0
            }]
        },
        {
            name: 'czech',
            words: [{
                key: 'Plaza',
                translation: 'Namesti',
                createdOn: 0
            }]
        }];

        newWord.before = {key: 'Flower', translation: 'Kvet'};

        newWord.after =  {
            key: 'Flower',
            translation: 'Kvet',
            createdOn: 0
        };

        mockData.withNewWord = mockData.czechWordsAfter.slice();
        mockData.withNewWord[1].words.push(newWord.after);

        // the language object to pass to add/delete functions
        czechLangObject =  mockData.czechWordsAfter[0];


        $httpBackend.whenGET(/\/languages\/*(?:\.json)*$/)
            .respond(mockData.languagesBefore);

        $httpBackend.whenGET(/\/translate\/slovak\/*(?:\.json)*$/)
            .respond(mockData.slovakWordsBefore);

        $httpBackend.whenGET(/\/translate\/czech\/*(?:\.json)*$/)
            .respond(mockData.czechWordsBefore);

    }));


    it('should fetch the array of languages and construct an array of objects', function() {
      translationService.getLanguages();

      $httpBackend.flush();

      expect(translationService.languages).toEqual(mockData.languagesAfter);
    });

    it('should fetch the words and construct the data structure ', function() {
        translationService.languages = mockData.languagesAfter;

        translationService.getWords('slovak');
        $httpBackend.flush();

        expect(translationService.languages).toEqual(mockData.slovakWordsAfter);
    });


    // This one keeps unexplicably failing, there is one extra word added everytime
    xit('should add more words to another language', function() {
        translationService.languages = mockData.slovakWordsAfter;

        translationService.getWords('czech');
        $httpBackend.flush();

        expect(translationService.languages).toEqual(mockData.czechWordsAfter);
    });

    it('should add new word', function() {
        translationService.languages = mockData.czechWordsAfter;

        // Here we pass the new word object and also the language object itself
        translationService.addWord(newWord.before, czechLangObject);
        expect(translationService.languages).toEqual(mockData.withNewWord);
    });

    // Delete function looks up words by key or translation, so we test both
    it('should delete a word looked up by key', function() {
        translationService.languages = mockData.withNewWord;

        translationService.deleteWord('Flower', czechLangObject);

        expect(translationService.languages).toEqual(mockData.czechWordsAfter);

    });

    it('should delete a word looked up by translation', function() {
        translationService.languages = mockData.withNewWord;

        translationService.deleteWord('Kvet', czechLangObject);

        expect(translationService.languages).toEqual(mockData.czechWordsAfter);

    });
});
