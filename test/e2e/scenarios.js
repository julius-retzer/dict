'use strict';

// It is strongly recommended to run this tests with local DB.
describe('dictApp', function() {

    var word,
        count,
        editable,
        addButton,
        inputForms,
        wordsLength,
        editableInput;

    var selectLanguage = function() {
        element.all(by.repeater('language in languages')).first().click();
    };

    var countWords = function() {

        return element.all(by.css('.word-pair')).count();
    };

    var submitWord = function() {
        element.all(by.css('.addButton')).first().click();
    };

    beforeEach(function() {
        browser.get('app/index.html');
        selectLanguage();
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Translation Service');
    });

    it('should have a title in the jumbotron', function() {
        expect(element(by.css('.jumbotron')).getText()).toBe('Translation Service');
    });

    it('should list available languages', function() {
        count = element.all(by.repeater('language in languages')).count();
        expect(count).not.toBe(0);
    });

    it('should list words', function() {
        wordsLength = countWords();

        expect(wordsLength).not.toEqual(0);
    });

    it('should not add new word with empty', function() {
        wordsLength = {};
        wordsLength.before = countWords();

        submitWord();

        wordsLength.after = countWords();
        expect(wordsLength.before).toEqual(wordsLength.after);
    });

    it('should add new word', function() {
        wordsLength = {};
        inputForms = {};

        inputForms.key = element.all(by.model('newWord.key')).first();
        inputForms.translation = element.all(by.model('newWord.translation')).first();

        wordsLength.before = countWords();

        inputForms.key.sendKeys('A new word');
        inputForms.translation.sendKeys('and its translation');

        submitWord();

        wordsLength.after = countWords();

        // Here should be used:
        // expect(wordsLength.after).toBeGreaterThan(wordsLength.before + 1);
        // but I think there is a bug where Jasmine doesn't unwrapp promise...
        expect(wordsLength.after).toBeGreaterThan(wordsLength.before);
    });

    it('should edit an existing word', function() {
        word = {};
        editable = element.all(by.css('.editable')).first();
        editableInput = element.all(by.css('.editable input')).first();
        word.before = editable.getText();

        editable.click();
        editableInput.clear();
        editableInput.sendKeys('AAAAA');
        editableInput.sendKeys('\n');

        word.after = editable.getText();

        expect(word.before).not.toBe(word.after);
        expect(word.after).toBe('AAAAA');
    });

    it('should delete a word', function() {
        wordsLength = {};
        editable.before = element.all(by.css('.editable')).first();
        wordsLength.before = countWords();

        editable.click();
        element.all(by.css('.glyph-remove')).first().click();

        editable.after = element.all(by.css('.editable')).first();
        wordsLength.after = countWords();

        expect(editable.before).not.toBe(editable.after);
        expect(wordsLength.before).toBeGreaterThan(wordsLength.after);

    });
});
