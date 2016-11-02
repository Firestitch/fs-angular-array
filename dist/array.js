
(function () {
    'use strict';

   /**
     * @ngdoc service
     * @name fs.fsArray
     */

    angular.module('fs-angular-array',[])
    .factory('fsArray', function ($filter) {
        var service = {
            nameValue: nameValue,
            remove: remove,
            filter: filter,
            index: index,
            indexOf: indexOf,
            sort: sort,
            rsort: rsort
        };

        return service;


        /**
         * @ngdoc method
         * @name fs.nameValue
         * @methodOf fs.fsArray
         * @description Accepts a custom array of objects and returns a array with name/value objects ie. [{ name: 'Name', value: 'value' },{ name: 'Name2', value: 'value2' }]
         * @param {array} arry The array used to build the name/value array
         * @param {string} name The name of the object's property used for name
         * @param {string} value The name of the object's property used for value
         * @returns {array} list
         */
        function nameValue(arry, name, value) {
            var list = [];
            angular.forEach(arry,function(item) {
                list.push({ name: item[name], value: item[value] });
            });
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

            if(idx!==null) {
                return arry.splice(idx,1);
            }

            return null;
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

            return null;
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

            var list = [];
            angular.forEach(arry,function(item,idx) {
                if(query(item)) {
                    list.push(item);
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
    });
})();

