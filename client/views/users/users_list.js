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
        });
      };

      $scope.findAll = function(){
        User.findAll().then(function(response){
          $scope.users = response.data.users;
        });
      };
    }]);
})();

