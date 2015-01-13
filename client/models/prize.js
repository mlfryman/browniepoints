/* jshint loopfunc:true, camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Prize', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function create(friendshipId, prize){
      return $http.post('/friends/' + friendshipId + '/prizes', prize);
    }

    function categories(){
      return $http.get('/categories');
    }

    function findAll(friendshipId){
      return $http.get('/friends/' + friendshipId + '/prizes');
    }

    function nuke(friendshipId, prizeId){
      return $http.delete('/friends/' + friendshipId + '/prizes/' + prizeId);
    }

    function buy(friendshipId, prize){
      return $http.post('/friends/' + friendshipId + '/prizes/' + prize.prizeId, prize);
    }

    return {
      create:create,
      categories:categories,
      findAll:findAll,
      nuke:nuke,
      buy:buy
    };
  }]);
})();
