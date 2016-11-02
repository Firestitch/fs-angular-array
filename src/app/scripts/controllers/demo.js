'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsArray) {

  	$scope.users = [{ id: 1, name: 'Will' },{ id: 2, name: 'Bob' },{ id: 3, name: 'Tom' }];

    $scope.list = fsArray.nameValue($scope.users,'id','name');

    $scope.indexof = fsArray.indexOf($scope.users,{ name: 'Tom' });

    $scope.filtered = fsArray.filter($scope.users,{ name: 'Will' });

    $scope.sorted = angular.copy(fsArray.sort($scope.users,'name'));

	$scope.rsorted = angular.copy(fsArray.rsort($scope.users,'name'));

    fsArray.remove($scope.users,{ name: 'Tom' });



});
