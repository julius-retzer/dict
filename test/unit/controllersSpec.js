'use strict';

/* jasmine specs for controllers go here */

describe('LanguageCtrl', function () {
    
    var scope, ctrl, $httpBackend;
    
    
    beforeEach(module('dictApp'));
    
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        
        $httpBackend.expectGET('http://private-9b43f-translateservice.apiary-mock.com/languages')
        .respond(["english", "czech"]);

        
        scope = $rootScope.$new();
        
        ctrl = $controller('LanguageCtrl', {$scope: scope});
    }));
    
    
    it("should retrieve language list", inject(function () {
        expect(scope.languages).toBeUndefined();
        $httpBackend.flush();

        expect(scope.languages).toEqual(["english", "czech"]);
    }));
    

});