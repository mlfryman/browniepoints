/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendshipDetailCtrl', ['$scope', '$state', 'User', 'Prize', 'Friendship', function($scope, $state, User, Prize, Friendship){
    $scope.friendshipId = $state.params.friendshipId;
    $scope.transaction  = {};
    $scope.moment       = moment;

    $scope.showModal = function(modalId){
      $(modalId).foundation('reveal', 'open');
    };

    $scope.reward = function(transaction){
      $scope.transaction.to_id = $scope.friend.friendId;
      console.log('CLIENT FRIENDSHIP CTRL - @params reward(transaction)', transaction);
      Friendship.reward($scope.friendshipId, transaction).then(function(response){
        $state.reload();
        $('#rewardModal').foundation('reveal', 'close');
      }, function(response){
        console.log('Error rewarding friend: ', response);
        $('#rewardModal').foundation('reveal', 'close');
      });
    };

    $scope.punish = function(transaction){
      $scope.transaction.to_id = $scope.friend.friendId;
      console.log('CLIENT FRIENDSHIP CTRL - @params punish(transaction)', transaction);
      Friendship.punish($scope.friendshipId, transaction).then(function(response){
        $('#punishModal').foundation('reveal', 'close');
        $state.reload();
      }, function(response){
        console.log('Error punishing friend: ', response);
        $('#punishModal').foundation('reveal', 'close');
      });
    };

    Friendship.findOne($state.params.friendshipId).then(function(response){
      $scope.friend = response.data;
    });
  }]);
})();
