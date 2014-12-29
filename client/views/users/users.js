(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('UsersCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = $state.current.name;

      $scope.submit = function(){
        if($scope.mode === 'register'){
          User.register($scope.user).then(function(response){
            console.log('CLIENT USERS CTRL - REGISTER response: ', response);
            $state.go('login');
          }, function(){
            $scope.user = {};
          });
        }else{
          User.login($scope.user).then(function(response){
            $rootScope.rootuser = response.data;
            console.log('CLIENT USERS CTRL - LOGIN response: ', response);
            $state.go('home');
          }, function(){
            $scope.user = {};
          });
        }
      };
    }]);
})();
