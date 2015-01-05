(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('FriendDetailCtrl', ['$scope', '$state', 'Friend', function($scope, $state, Friend){
    $scope.moment = moment;

    // Friend.show($state.params.friendId).then(function(response){
    //   $scope.friend = response.data;
    // });
  }]);
})();
