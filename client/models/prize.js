/* jshint loopfunc:true, camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
  .factory('Prize', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function create(prize){
      return $http.post('/prizes', prize);
    }

    function query(tag, page){
      return $http.get('/prizes?limit=5&offset=' + 5 * page + '&tag=' + tag);
    }

    function show(prizeId){
      return $http.get('/prizes/' + prizeId);
    }

    function count(){
      return $http.get('/prizes/count');
    }

    function nuke(prize){
      return $http.delete('/prizes/' + prize.prize_id);
    }

    function upload(prizeId, files){
      var count = 0;
      for (var i = 0; i < files.length; i++){
        var file = files[i];
        $upload.upload({
          url: '/prizes/' + prizeId + '/upload',
          method: 'POST',
          file: file
        }).success(function(data, status, headers, config){
          count++;
          $rootScope.$broadcast('upload', count);
        }).error(function(){
          console.log('An error has occurred during a file upload');
        });
      }
    }

    function edit(prize){
      return $http.put('/prizes/' + prize.prize_id, prize);
    }

    return {create:create, query:query, show:show, count:count, nuke:nuke, upload:upload, edit:edit};
  }]);
})();
