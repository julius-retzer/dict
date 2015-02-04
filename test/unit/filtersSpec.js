'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('dictFilters'));

  describe('capitalize', function() {

    it('should capitalize first letter or empty string with no input',
        inject(function(capitalizeFilter) {
            expect(capitalizeFilter('test')).toBe('Test');
            expect(capitalizeFilter('various words test')).toBe('Various words test');
            expect(capitalizeFilter('')).toBe('');
            expect(capitalizeFilter('$%')).toBe('$%');
    }));
  });
});
