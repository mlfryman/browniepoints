(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('UsersListCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.mode  = 'Find Friends';
      $scope.users = [];

      $scope.findByEmail = function(searchEmail){
        User.findByEmail(searchEmail).then(function(response){
          $scope.users = response.data.users;
        });
      };

      $scope.findAll = function(){
        User.findAll().then(function(response){
          $scope.users = response.data.users;
        });
      };
    }]);
})();

