'use strict';


describe('dict app', function() {

    var inputForms, addButton, wordList, wordsLength, wordSpan, editForm;

    beforeEach(function() {
        browser.get('app/index.html');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Translation Service');
    });

    it('should have a title in a jumbotron', function() {
        expect(element(by.css('.jumbotron')).getText()).toBe('Translation Service');
    });

    it('should list available languages', function() {
        element.all(by.repeater('language in languages')).then(function(elems) {
            expect(elems.length).not.toBe(0);
        });
    });

    it('should list words', function() {
        element.all(by.repeater('language in languages')).then(function(elems) {
            elems[0].click();
        });

        element.all(by.repeater('word in languages.words')).then(function(elems){
            expect(elems.length).not.toEqual(0);
        });
    });

    it('should not add new word with empty', function() {
        wordsLength = {};
        wordList = element.all(by.repeater('word in languages.words')).then(function(elems){
            wordsLength.before = elems.length;
        });

        addButton = element(by.css('.addButton'));
        addButton.click();

        wordList = element.all(by.repeater('word in languages.words')).then(function(elems){
            wordsLength.after = elems.length;
        });

        expect(wordsLength.before).toEqual(wordsLength.after);
    });

    it('should add new word', function() {
        wordsLength = {};
        inputForms = {};
        inputForms.key = element(by.model('newWord.key'));
        inputForms.translation = element(by.model('newWord.translation'));

        wordList = element.all(by.repeater('word in languages.words')).then(function(elems){
            console.log(elems);
            wordsLength.before = elems.length;
        });

        inputForms.key.sendKeys('A new word');
        inputForms.translation.sendKeys('and its translation');

        wordList = element.all(by.repeater('word in languages.words')).then(function(elems){
            wordsLength.after = elems.length;
        });

        expect(wordsLength.before).toEqual(wordsLength.after + 1);
    });

    xit('should edit an existing word', function() {
        wordsLength = {};
        wordList = element.all(by.repeater('word in languages.words')).then(function(elems){
            wordsLength.before = elems.length;
            wordSpan = wordList.
            editForm = element
        });
    });
});
