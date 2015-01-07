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
        return $http.post('/users/request', friendId);
      }

      return {register:register,
        login:login,
        logout:logout,
        findByEmail:findByEmail,
        findAll:findAll,
        friendRequest:friendRequest
      };
    }]);
})();
