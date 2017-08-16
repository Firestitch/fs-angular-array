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



(function () {
	'use strict';

   /**
	 * @ngdoc service
	 * @name fs.fsArray
	 */

	angular.module('fs-angular-array')
	.factory('fsArray', function ($filter) {
		var service = {
			nameValue: nameValue,
			remove: remove,
			filter: filter,
			index: index,
			indexOf: indexOf,
			sort: sort,
			rsort: rsort,
			list: list,
			ksort: ksort,
			keyExists: keyExists,
			applyDepth: applyDepth,
			inArray: inArray
		};

		return service;


		/**
		 * @ngdoc method
		 * @name fs.nameValue
		 * @methodOf fs.fsArray
		 * @description Accepts a custom array of objects and returns a array with name/value objects ie. [{ name: 'Name', value: 'value' },{ name: 'Name2', value: 'value2' }]
		 * @param {array} arry The array used to build the name/value array
		 * @param {string|function} name The name of the object's property used for name or custom function
		 * @param {string|function} value The name of the object's property used for value or custom function
		 * @returns {array} list
		 */
		function nameValue(arry, name, value) {

			var list = [];
			if(name || value) {

				var nameFn = angular.isFunction(name) ? name : function(item) { return item[name] };
				var valueFn = angular.isFunction(value) ? value : function(item) { return item[value] };

				angular.forEach(arry,function(item) {
					list.push({ name: nameFn(item), value: valueFn(item) });
				});

			} else {
				angular.forEach(arry,function(name,value) {
					list.push({ name: name, value: value });
				});
			}

			return list;
		}


		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.remove
		 * @description Removes an array element based on a query
		 * @param {array} arry The array to be altered
		 * @param {function|object} query An object that is used to query the array ie: { id: 200 } will find any elements that match id=200 and will remove them from the array
		 * @returns {object} object The element that was removed
		 */
		function remove(arry, query) {

			var idx = indexOf(arry,query);

			if(idx>=0) {
				return arry.splice(idx,1);
			}

			return idx;
		}

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.indexOf
		 * @description Returns the index of the element in the array
		 * @param {array} arry The array to be searched
		 * @param {function|object} query An object that is used to query the array ie: { id: 200 } will find any elements that match id=200 and will remove them from the array
		 * @returns {object} object The index of the object
		 */
		function indexOf(arry, query) {

			if(!angular.isFunction(query)) {
				query = angular.bind(this,compare,query);
			}

			for(var i=0, len=arry.length; i<len; i++) {
				if(query(arry[i])) {
					return i;
				}
			}

			return -1;
		}

		function compare(query,item) {
			var value = true, key;
			for (key in query) {
				value &= item[key]==query[key];
			}
			return value;
		}

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.filter
		 * @description Filters the array based on the result of a function
		 * @param {array} arry The array to be altered
		 * @param {function|object} func The function that is used to evaluate if the element is valid by returning a boolean.
		 * @returns {array} array The filtered array
		 */
        function filter(arry, query) {

            if(!angular.isFunction(query)) {
                query = angular.bind(this,compare,query);
            }

            var isarry = angular.isArray(arry);
            var list = isarry ? [] : {};
            angular.forEach(arry,function(item,idx) {
                if(query(item)) {
                    if(isarry) {
                        list.push(item);
                    } else {
                        list[idx] = item;
                    }
                }
            });
            return list;
        }

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.index
		 * @description Indexes the array based on a property of the object
		 * @param {array} arry The array to be altered
		 * @param {string} property The propery that is used to get the value used in the index
		 * @returns {array} array The indexed array
		 */
		function index(arry, property) {
			var list = {};
			angular.forEach(arry,function(item,idx) {
				list[item[property]] = item;
			});
			return list;
		}

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.sort
		 * @description Sorts the array based on a query
		 * @param {array} arry The array to be sorted
		 * @param {function|string} query The function or property to base sorting on
		 * @param {boolean} reverse Indicates if sorting should be reversed
		 * @returns {array} array The sorted array
		 */
		function sort(arry, query, reverse) {
			if(!angular.isFunction(query)) {
				query = angular.bind(this,function(query,a,b) {

					if(reverse) {
						if (a[query] < b[query]) {
							return 1;
						} else if (a[query] > b[query]) {
							return -1;
						}
					} else {
						if (a[query] > b[query]) {
							return 1;
						} else if (a[query] < b[query]) {
							return -1;
						}
					}
					return 0;
				},query);
			}

			arry.sort(query);
			return arry;
		}

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.rsort
		 * @description Reverse sorts the array based on a query
		 * @param {array} arry The array to be reverse sorted
		 * @param {function|string} query The function or property to base sorting on
		 * @returns {array} array The sorted array
		 */
		function rsort(arry, query) {
			return sort(arry, query, true);
		}


		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.list
		 * @description Indexes the array based on a property of the object
		 * @param {array} arry The array to be altered
		 * @param {string} property The propery that is used for the value in the list
		 * @param {string} index The propery that is used for the index of the item in the list
		 * @returns {array} array
		 */
		function list(arry, property, index) {
			var list = index ? {} : [];
			angular.forEach(arry,function(item,idx) {
				if(index) {
					list[item[index]] = item[property];
				} else {
					list.push(item[property]);
				}
			});
			return list;
		}




		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.applyDepth
		 * @description adds depth property to objects bassed of parent/child relationships
		 * @param {array} objects The array to be altered
		 * @param {string} parent_property The name of the property in the child object to link with the parent.
		 * @param {string} id_property optional. The name of the propery in the parent object referenced by children.  default 'id'
		 * @param {string} depth_property The name of the propery to that will be added to hold depth value. default 'depth'
		 * @returns {array} array
		 */
		function applyDepth(objects, parent_property, id_property, depth_property) {
			var id_property = id_property || 'id';
			var depth_property = depth_property || 'depth';

			var keyed = [];
			angular.forEach(objects, function(object) {
				if(!object[parent_property])
					object[depth_property] = 0;

				keyed[object[id_property]] = object;
			});

			angular.forEach(keyed, function(object) {
				angular.forEach(keyed, function(object) {
					if(!object[depth_property]) {
						if(object[parent_property]) {
							object[depth_property] = keyed[object[parent_property]][depth_property] + 1;
						}
					}
				});
			});

			return keyed;
		}

		/**
		 * @ngdoc method
		 * @methodOf fs.fsArray
		 * @name fs.inArray
		 * @description Checks if value(s) are in an array
		 * @param {array|string|number} values Needle
		 * @param {array} arry Haystack
		 * @returns {boolean} boolean
		 */
		function inArray(values, arry) {

			if(!angular.isArray(values)) {
				values = [values];
			}

			for(var i=0, len=values.length; i<len; i++) {
				if(arry.indexOf(values[i])>=0) {
					return true;
				}
			}

			return false;
		}

		function keyExists(array,key) {
			return key in array;
		}

		function ksort(array) {
			Object.keys(array).sort().forEach(function(key) {
		        var value = array[key];
		        delete array[key];
		        array[key] = value;
		    });
		    return array;
		}

	});
})();
