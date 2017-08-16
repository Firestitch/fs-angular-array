(function () {
    'use strict';

	angular.module('fs-angular-array',[])
  	.filter('fsArrayKeyExists',function(fsArray) {
  		return function(value1,value2) {
	    	return fsArray.keyExists(value1,value2);
	    }
  	})
  	.filter('fsArraykSort',function(fsArray) {
  		return function(value) {
	    	return fsArray.ksort(value);
	    }
  	});

})();
