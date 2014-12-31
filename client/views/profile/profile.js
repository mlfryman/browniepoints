(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('ProfileCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = 'profile';
    }]);
})();
