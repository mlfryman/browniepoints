(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendshipsListCtrl', ['$scope', '$state', 'Friendship', function($scope, $state, Friendship){
      $scope.mode = 'My Friends';
      $scope.moment = moment;
      $scope.friends = [];

      Friendship.findAll().then(function(response){
        $scope.friends = response.data;
      });
  }]);
})();
