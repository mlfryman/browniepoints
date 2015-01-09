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

    function list(){
      return $http.get('/friends');
    }

    function count(){
      return $http.get('/friends/count');
    }

    return {
      request:request,
      pending:pending,
      accept:accept,
      deny:deny,
      list:list,
      count:count
    };
  }]);
})();
