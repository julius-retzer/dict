'use strict';

/* Filters */

var dictFilters = angular.module('dictFilters', [])

dictFilters.filter('capitalize', function() {
  return function(input) {
    return input ? input[0].toUpperCase() + input.slice(1) : '';
  };
})