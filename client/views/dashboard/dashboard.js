/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .controller('DashboardCtrl', ['$rootScope', '$scope', '$state', 'User', 'Prize', 'Friendship', function($rootScope, $scope, $state, User, Prize, Friendship){
      $scope.mode = 'dashboard';
      $scope.moment = moment;

      Friendship.pending().then(function(response){
        $scope.pending = response.data.pending;
      });
    }]);
})();
