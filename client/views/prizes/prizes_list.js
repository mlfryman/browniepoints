(function(){
  'use strict';

  angular.module('browniepoints')
  .controller('PrizesListCtrl', ['$scope', '$state', 'Prize', function($scope, $state, Prize){
    $scope.mode = 'prizes';
    $scope.files = [];
    $scope.count = 0;
    $scope.pages = 0;
    $scope._ = _;
    $scope.moment = moment;

    Prize.query($state.params.tag || '%', $state.params.page * 1 || 0).then(function(response){
      $scope.prizes = response.data.prizes;
    });

    Prize.count().then(function(response){
      $scope.total = response.data.count * 1;
      $scope.pages = Math.ceil($scope.total / 5);
    });

    $scope.nuke = function(prize){
      Prize.nuke(prize).then(function(response){
        $state.reload();
      });
    };

    $scope.isCurrent = function(page){
      return page === $state.params.page * 1;
    };

    $scope.create = function(prize){
      $scope.count = 0;
      Prize.create(prize).then(function(response){
        $scope.prize = {};
        Prize.upload(response.data.prizeId, $scope.files);
      });
    };

    $scope.$on('upload', function(e, count){
      $scope.count = count;
      if($scope.count === $scope.files.length){
        $state.reload();
      }
    });
  }]);
})();
