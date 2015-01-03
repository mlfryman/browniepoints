(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('EditProfileCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = 'Edit Profile';

      $scope.editProfile = function(user){
        User.update(user).then(function(response){
          $state.reload();
        });
      };
  }]);
})();
