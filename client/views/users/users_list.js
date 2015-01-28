/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('UsersListCtrl', ['$rootScope', '$scope', '$state', 'User', 'Friendship', function($rootScope, $scope, $state, User, Friendship){
      $scope.mode       = 'Find Friends';
      $scope.users      = [];

      $scope.search = function(searchEmail){
        User.findByEmail(searchEmail).then(function(response){
          $scope.searchEmail = '';
          $scope.user = response.data.user;
          // console.log('CLIENT USERS LIST CTRL - search USER: ', $scope.user);
        });
      };

      $scope.request = function(){
        $scope.friend2Id = $scope.user.id;
        Friendship.request($scope.friend2Id).then(function(response){
          // console.log('CLIENT USERS LIST CTRL - request $scope.friend2Id: ', $scope.friend2Id);
          // console.log('CLIENT USERS LIST CTRL - request RESPONSE: ', response);
          $state.go('dashboard');
        });
      };

      $scope.findAll = function(){
        User.findAll().then(function(response){
          $scope.users = response.data.users;
        });
      };
    }]);
})();

