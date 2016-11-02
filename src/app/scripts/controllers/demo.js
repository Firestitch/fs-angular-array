'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsArray) {

  	$scope.users = [{ id: 1, name: 'Bob' },{ id: 2, name: 'Tom' },{ id: 3, name: 'Will' }];

    $scope.list = fsArray.nameValue($scope.users,'id','name');

    $scope.indexof = fsArray.indexOf($scope.users,{ name: 'Tom' });

    $scope.filtered = fsArray.filter($scope.users,{ name: 'Will' });

    fsArray.remove($scope.users,{ name: 'Tom' });



});
