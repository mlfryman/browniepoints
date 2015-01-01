(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('MessagesCtrl', ['$rootScope', '$scope', '$state', 'User', function($rootScope, $scope, $state, User){
      $scope.user = {};
      $scope.mode = 'messages';
    }]);
})();
