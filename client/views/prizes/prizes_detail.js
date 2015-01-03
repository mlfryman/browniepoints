(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('PrizesDetailCtrl', ['$scope', '$state', 'Prize', function($scope, $state, Prize){
    $scope.moment = moment;
    $scope.prize = {};

    Prize.show($state.params.prizeId).then(function(response){
      $scope.prize = response.data;
    });

    $scope.edit = function(prize){
      Prize.edit(prize).then(function(response){
        $state.reload();
      });
    };
  }]);
})();
