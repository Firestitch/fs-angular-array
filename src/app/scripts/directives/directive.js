(function () {
    'use strict';

   /**
     * @ngdoc service
     * @name fs.fsArray
     * @description
     * This provider is a wrapper around built in $http that provides {@link fs.fsApi service} that allows to
     * interact with REST API servers in a simple and convenient way.
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
         * @description Accepts a custom array of objects and returns a array with name/value objects ie. [{ name: 'Name', value: 'value' }]
         * @param {array} arry The array used to build the name/value array
         * @param {string} name The name of the object's property used for name
         * @param {string} value The name of the object's property used for value
         * @return {array}
         */

        function nameValue(arry, name, value) {
            var list = [];
            angular.forEach(arry,function(item) {
                list.push({ name: item[name], value: item[value] });
            });
            return list;
        }

        function remove(arry, query) {

            var item = $filter('filter')(arry,query,true)[0];

            if(item) {
                var index = arry.indexOf(item);
                return arry.splice(index,1);
            }
        }
    });
})();
