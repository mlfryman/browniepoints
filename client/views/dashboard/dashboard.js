/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', 'User', 'Prize', 'Friendship', function($rootScope, $scope, $state, User, Prize, Friendship){
      $scope.mode = 'dashboard';
      $scope.moment = moment;
      $scope.pending = [];
      $scope.friendship = [];

      Friendship.pending().then(function(response){
        $scope.pending = response.data;
      });

      $scope.accept = function(friendshipId){
        console.log('CLIENT DASHBOAD CTRL - @param accept(friendshipId): ', friendshipId);
        Friendship.accept(friendshipId).then(function(response){
          $state.reload();
        });
      };

      $scope.deny = function(friendshipId){
        console.log('CLIENT DASHBOAD CTRL - @param deny(friendshipId): ', friendshipId);
        Friendship.deny(friendshipId).then(function(response){
          $state.reload();
        });
      };
    }]);
})();
