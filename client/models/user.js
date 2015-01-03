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

      function editProfile(user){
        return $http.put('/edit/' + user.user_id, user);
      }

      return {register:register, login:login, logout:logout, editProfile:editProfile};
    }]);
})();
