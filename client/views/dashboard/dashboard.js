(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = 'dashboard';
    }]);
})();
