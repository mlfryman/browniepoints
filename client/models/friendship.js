/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Friendship', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function request(friend2Id){
      return $http.post('/friends/request/' + friend2Id);
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
     return $http.post('/friends/' + friendshipId + '/reward', transaction);
    }

    function punish(friendshipId, transaction){
      return $http.post('/friends/' + friendshipId + '/punish', transaction);
    }

    function findAllTransactions(friendshipId){
      return $http.get('/friends/' + friendshipId + '/transactions');
    }

    function myWallet(friendshipId){
      console.log('CLIENT FRIENDSHIP MODEL - .myWallet @ params friendshipId: ', friendshipId);
      return $http.get('/friends/' + friendshipId + '/wallets');
    }

    function friendWallet(friendshipId, friendId){
      console.log('CLIENT FRIENDSHIP MODEL - .friendWallet @ params friendshipId: ', friendshipId);
      return $http.get('/friends/' + friendshipId + '/wallets/' + friendId);
    }

    return {
      request:request,
      pending:pending,
      accept:accept,
      deny:deny,
      findAll:findAll,
      findOne:findOne,
      reward:reward,
      punish:punish,
      findAllTransactions:findAllTransactions,
      myWallet:myWallet,
      friendWallet:friendWallet
    };
  }]);
})();
