'use strict';

(function() {
    var dictFilters = angular.module('dictFilters', []);

    // Simple filter to capitalize first letter
    dictFilters.filter('capitalize', function() {
      return function(input) {
        return input ? input[0].toUpperCase() + input.slice(1) : '';
      };
    });
})();
