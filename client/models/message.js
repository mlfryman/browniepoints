/* jshint loopfunc:true, camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Message', ['$rootScope', '$http', function($rootScope, $http){

    function create(message){
      return $http.post('/messages', message);
    }

    function query(tag, page){
      return $http.get('/messages?limit=5&offset=' + 5 * page + '&tag=' + tag);
    }

    function show(messageId){
      return $http.get('/messages/' + messageId);
    }

    function count(){
      return $http.get('/messages/count');
    }

    function nuke(message){
      return $http.delete('/messages/' + message.message_id);
    }

    return {create:create, query:query, show:show, count:count, nuke:nuke};
  }]);
})();
