
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
            remove: remove
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
         * @name fs.remove
         * @methodOf fs.fsArray
         * @description Removes an array element based on a query
         * @param {array} arry The array to be altered
         * @param {object} query An object that is used to query the array ie: { id: 200 } will find any elements that match id=200 and will remove them from the array
         * @returns {object} object The element that was removed
         */
        function remove(arry, query) {

            var items = $filter('filter')(arry,query,true);

            if(items.length) {
                var spliced = null;
                angular.forEach(items,function(item) {
                    var index = arry.indexOf(item);
                    spliced = arry.splice(index,1);
                });
                return spliced;
            }
        }
    });
})();


