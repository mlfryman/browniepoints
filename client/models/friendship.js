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

    function show(friendshipId){
      return $http.get('/friends/' + friendshipId);
    }

    return {
      request:request,
      pending:pending,
      accept:accept,
      deny:deny,
      findAll:findAll,
      show:show
    };
  }]);
})();
