(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('MessagesDetailCtrl', ['$scope', '$state', 'Message', function($scope, $state, Message){
    $scope.moment = moment;

    Message.show($state.params.messageId).then(function(response){
      $scope.message = response.data;
    });
  }]);
})();
