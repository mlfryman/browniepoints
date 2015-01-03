
(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('MessagesListCtrl', ['$scope', '$state', 'Message', function($scope, $state, Message){
    $scope.message = {};
    $scope.moment = moment;

  }]);
})();
