(function(){
  'use strict';

  angular.module('browniepoints', ['ui.router', 'angularFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',         {url:'/',            templateUrl:'/views/home/home.html'})
        .state('register',     {url:'/register',    templateUrl:'/views/users/users.html',           controller:'UsersCtrl'})
        .state('login',        {url:'/login',       templateUrl:'/views/users/users.html',           controller:'UsersCtrl'})
        .state('profile',      {url:'/profile',     templateUrl:'/views/profile/profile.html',       controller:'ProfileCtrl'})
        .state('dashboard',    {url:'/dashboard',   templateUrl:'/views/dashboard/dashboard.html',   controller:'DashboardCtrl'})
        .state('prizes',       {url:'/prizes',      templateUrl:'/views/prizes/prizes.html',         controller:'PrizesCtrl'})
        .state('messages',     {url:'/messages',    templateUrl:'/views/messages/inbox.html',        controller:'MessagesCtrl'});
      }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);
})();
