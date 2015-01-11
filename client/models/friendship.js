/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Friendship', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function request(friend2Id){
      return $http.post('/friends/request', friend2Id);
    }

    function pending(){
      return $http.get('/friends/pending');
    }

    function accept(friendshipId){
      return $http.put('/friends/' + friendshipId + '/accept');
    }

    function deny(friendshipId){
      return $http.delete('/friends/' + friendshipId + '/deny');
    }

    function findAll(){
      return $http.get('/friends');
    }

    function findOne(friendshipId){
      return $http.get('/friends/' + friendshipId);
    }

    function reward(friendshipId, transaction){
      console.log('CLIENT FRIENDSHIP MODEL - @params reward(friendshipId)', friendshipId);
      console.log('CLIENT FRIENDSHIP MODEL - @params reward(transaction)', transaction);
      return $http.post('/transactions/' + friendshipId + '/reward', transaction);
    }

    function punish(friendshipId, transaction){
      console.log('CLIENT FRIENDSHIP MODEL - @params punish(friendshipId)', friendshipId);
      console.log('CLIENT FRIENDSHIP MODEL - @params punish(transaction)', transaction);
      return $http.post('/transactions/' + friendshipId + '/punish', transaction);
    }

    return {
      request:request,
      pending:pending,
      accept:accept,
      deny:deny,
      findAll:findAll,
      findOne:findOne,
      reward:reward,
      punish:punish
    };
  }]);
})();
