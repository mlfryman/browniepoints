/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', 'User', 'Prize', 'Friendship', function($rootScope, $scope, $state, User, Prize, Friendship){
      $scope.mode = 'dashboard';
      $scope.moment = moment;
      $scope.pending = [];
      $scope.friends = [];

      Friendship.pending().then(function(response){
        $scope.pending = response.data;
      });

      Friendship.findAll().then(function(response){
        $scope.friends = response.data;
      });

      $scope.accept = function(friendshipId){
        Friendship.accept(friendshipId).then(function(response){
          $state.reload();
        });
      };

      $scope.deny = function(friendshipId){
        Friendship.deny(friendshipId).then(function(response){
          $state.reload();
        });
      };
    }]);
})();
