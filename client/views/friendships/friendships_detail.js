/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendshipDetailCtrl', ['$rootScope', '$scope', '$state', 'User', 'Prize', 'Friendship', function($rootScope, $scope, $state, User, Prize, Friendship){
    $scope.myId         = $rootScope.rootuser.id;
    $scope.friendshipId = $state.params.friendshipId;
    $scope.friend       = {};
    $scope.transaction  = {};
    $scope.transactions = [];
    $scope.prize        = {};
    $scope.prizes       = [];
    $scope.categories   = [];
    $scope.category     = null;
    $scope.moment       = moment;
    $scope.myWallet     = null;
    $scope.friendWallet = null;

    $scope.showModal = function(modalId){
      $(modalId).foundation('reveal', 'open');
    };

// TRANSACTIONS
    $scope.reward = function(transaction){
      $scope.transaction.to_id = $scope.friend.friendId;
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

    Friendship.findAllTransactions($state.params.friendshipId).then(function(response){
      $scope.transactions = response.data;
    });

// PRIZES
    $scope.createPrize = function(prize){
      $scope.prize.category_id = $scope.category.categoryId;
      $scope.prize.to_id = $scope.friend.friendId;
      Prize.create($scope.friendshipId, prize).then(function(response){
        $scope.prize = {};
        $state.reload();
        $('#addPrizeModal').foundation('reveal', 'close');
      }, function(response){
        console.log('Error creating a prize: ', response);
        $('#addPrizeModal').foundation('reveal', 'close');
      });
    };

    Prize.categories().then(function(response){
      $scope.categories = response.data.categories;
    });

    Prize.findAll($state.params.friendshipId).then(function(response){
      $scope.prizes = response.data.prizes;
    });

    $scope.nuke = function(prizeId){
      Prize.nuke($scope.friendshipId, prizeId).then(function(response){
        $state.reload();
      });
    };

    $scope.buy = function(prize){
      Prize.buy($state.params.friendshipId, prize).then(function(response){
        $state.reload();
      });
    };

    Friendship.myWallet($state.params.friendshipId).then(function(response){
      console.log('CLIENT FRIENDSHIP DETAIL CTRL - Friendships.myWallet @params $scope.params.friendshipId: ', $scope.params.friendshipId);
      $scope.myWallet = response.data;
    });

    $scope.myWallet = function(){
      $scope.friendId = $scope.friend.friendId;
      Friendship.myWallet($state.params.friendshipId, $scope.friendId).then(function(response){
        console.log('CLIENT FRIENDSHIP DETAIL CTRL - Friendships.friendWallet @params $scope.params.friendshipId: ', $scope.params.friendshipId);
        console.log('CLIENT FRIENDSHIP DETAIL CTRL - Friendships.friendWallet @payload $scope.friendId: ', $scope.friendId);
        $scope.friendWallet = response.data;
      });
    };
  }]);
})();
