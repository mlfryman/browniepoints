/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('UsersListCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.mode       = 'Find Friends';
      $scope.users      = [];
      // $scope.friendship = {};

      $scope.search = function(searchEmail){
        console.log('search(searchEmail): ', searchEmail);
        User.findByEmail(searchEmail).then(function(response){
          $scope.searchEmail = '';
          $scope.user = response.data.user;
          console.log('User.findByEmail $scope.user: ', $scope.user);
        });
      };

      $scope.findAll = function(){
        User.findAll().then(function(response){
          $scope.users = response.data.users;
        });
      };

      $scope.friendRequest = function(friendId){
        User.friendRequest(friendId).then(function(response){
          $state.reload();
        });
      };
    }]);
})();

