(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendsListCtrl', ['$scope', '$state', 'Friend', function($scope, $state, Friend){
    $scope.mode = 'friends';
    $scope.count = 0;
    $scope.pages = 0;
    $scope._ = _;
    $scope.moment = moment;

    Friend.query($state.params.tag || '%', $state.params.page * 1 || 0).then(function(response){
      $scope.friends = response.data.friends;
    });

    Friend.count().then(function(response){
      $scope.total = response.data.count * 1;
      $scope.pages = Math.ceil($scope.total / 5);
    });

    $scope.nuke = function(friend){
      Friend.nuke(friend).then(function(response){
        $state.reload();
      });
    };

    $scope.isCurrent = function(page){
      return page === $state.params.page * 1;
    };

    $scope.create = function(friend){
      $scope.count = 0;
      Friend.create(friend).then(function(response){
        $scope.friend = {};
        $state.reload();
      });
    };
  }]);
})();
