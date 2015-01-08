/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', 'User', 'Prize', 'Friendship', function($rootScope, $scope, $state, User, Prize, Friendship){
      $scope.mode = 'dashboard';
      $scope.moment = moment;
      // $scope.friendships = [];
      // $scope.friendship = {};

      Friendship.pending().then(function(response){
        console.log('CLIENT DASHBOAD CTRL - Friendship.pending: ', response);
        $scope.friendships = response;
      });
    }]);
})();
