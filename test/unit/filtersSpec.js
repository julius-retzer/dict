'use strict';


describe('filters', function() {

    beforeEach(module('dictFilters'));
    
    var capitalizeFilter;
    
    describe('capitalize filter', function() {

        beforeEach(inject(function(_capitalizeFilter_) {
            capitalizeFilter = _capitalizeFilter_;
        }));

        it('should capitalize first letter', function(){
            expect(capitalizeFilter('test')).toBe('Test');
            expect(capitalizeFilter('various words test')).toBe('Various words test');
        });
        it('should do nothing if something other than letters provided', function(){
            expect(capitalizeFilter('')).toBe('');
            expect(capitalizeFilter('$%')).toBe('$%');
        })
    });
});
