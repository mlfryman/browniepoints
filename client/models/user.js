/* jshint camelcase:false */

(function(){
  'use strict';

  angular.module('browniepoints')
    .factory('User', ['$http', function($http){

      function register(user){
        return $http.post('/register', user);
      }

      function login(user){
        return $http.post('/login', user);
      }

      function logout(){
        return $http.delete('/logout');
      }

      function findByEmail(searchEmail){
        return $http.get('/users/' + searchEmail);
      }

      function findAll(){
        return $http.get('/users');
      }

      function friendRequest(friendId){
        console.log('CLIENT USER MODEL - User.friendRequest friendId: ', friendId);
        return $http.post('/friends/request', friendId);
      }

      return {register:register,
        login:login,
        logout:logout,
        // upload:upload,
        findByEmail:findByEmail,
        findAll:findAll,
        friendRequest:friendRequest
      };
    }]);
})();


      // function upload(userId, files){
      //   var count = 0;
      //   for (var i = 0; i < files.length; i++){
      //     var file = files[i];
      //     $upload.upload({
      //       url: '/users/' + userId + '/upload',
      //       method: 'POST',
      //       file: file
      //     }).success(function(data, status, headers, config){
      //       count++;
      //       $rootScope.$broadcast('upload', count);
      //     }).error(function(){
      //       console.log('An error has occurred uploading an avatar.');
      //     });
      //   }
      // }
