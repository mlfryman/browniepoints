(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendsListCtrl', ['$scope', '$state', 'Friend', function($scope, $state, Friend){
    $scope.mode = 'Friends Dashboard';
  }]);
})();
