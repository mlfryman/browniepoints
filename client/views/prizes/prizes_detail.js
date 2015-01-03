(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('PrizesDetailCtrl', ['$scope', '$state', 'Prize', function($scope, $state, Prize){
    $scope.moment = moment;

    Prize.show($state.params.prizeId).then(function(response){
      $scope.prize = response.data;
    });
  }]);
})();
