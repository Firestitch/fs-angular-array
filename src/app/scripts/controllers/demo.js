'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsArray) {

  	$scope.users = [{ id: 1, name: 'Bob' },{ id: 2, name: 'Tom' },{ id: 3, name: 'Will' }];

    $scope.list = fsArray.nameValue($scope.users,'id','name');

    fsArray.remove($scope.users,{ name: 'Tom' });

});
