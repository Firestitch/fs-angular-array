'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope, fsArray) {

  	$scope.array = [{ id: 1, name: 'Will' },{ id: 2, name: 'Bob' },{ id: 3, name: 'Tom' }];

    $scope.nameValue = fsArray.nameValue($scope.array,'id','name');

    $scope.nameValueKeyValue = fsArray.nameValue({ 'first': 'First', 'second': 'Second', 'third': 'Third' });

    $scope.indexOf = fsArray.indexOf($scope.array,{ name: 'Tom' });

    $scope.filter = fsArray.filter($scope.array,{ name: 'Will' });

    $scope.sort = angular.copy(fsArray.sort($scope.array,'name'));

	$scope.rsort = angular.copy(fsArray.rsort($scope.array,'name'));

    fsArray.remove(angular.copy($scope.array),{ name: 'Tom' });

    $scope.list = fsArray.list($scope.array,'name');

    $scope.listIndex = fsArray.list($scope.array,'name','id');

    var arr = angular.copy($scope.array);
    arr[1].parent_id = 1;
	$scope.applyDepth = fsArray.applyDepth(arr,'parent_id', 'id');

	$scope.inArray = fsArray.inArray(22,[11,22,33,44,55]);

});
