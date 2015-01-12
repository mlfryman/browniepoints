/* jshint loopfunc:true, camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Prize', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function create(friendshipId, prize){
      console.log('CLIENT PRIZE MODEL - @params create(friendshipId): ', friendshipId);
      console.log('CLIENT PRIZE MODEL - @params create(prize): ', prize);
      return $http.post('/friends/' + friendshipId + '/prizes', prize);
    }

    function categories(){
      return $http.get('/categories');
    }

    function query(friendshipId){
      return $http.get('/friends/' + friendshipId + '/prizes');
    }

    return {
      create:create,
      categories:categories,
      query:query
    };
  }]);
})();
