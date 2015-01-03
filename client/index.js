(function(){
  'use strict';

  angular.module('browniepoints', ['ui.router', 'angularFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',            {url:'/',            templateUrl:'/views/home/home.html'})
        .state('register',        {url:'/register',    templateUrl:'/views/users/users.html',              controller:'UsersCtrl'})
        .state('login',           {url:'/login',       templateUrl:'/views/users/users.html',              controller:'UsersCtrl'})
        .state('prizes',          {url:'/prizes',      templateUrl:'/views/prizes/prizes.html',            abstract:true})
        .state('prizes.list',     {url:'?tag&page',    templateUrl:'/views/prizes/prizes_list.html',       controller:'PrizesListCtrl'})
        .state('prizes.detail',   {url:'/{prizeId}',   templateUrl:'/views/prizes/prizes_detail.html',     controller:'PrizesDetailCtrl'})
        .state('messages',        {url:'/messages',    templateUrl:'/views/messages/messages.html',        abstract:true})
        .state('messages.list',   {url:'?tag&page',    templateUrl:'/views/messages/messages_list.html',   controller:'MessagesListCtrl'})
        .state('messages.detail', {url:'/{messageId}', templateUrl:'/views/messages/messages_detail.html', controller:'MessagesDetailCtrl'})
        .state('dashboard',       {url:'/dashboard',   templateUrl:'/views/dashboard/dashboard.html',      controller:'DashboardCtrl'})
        .state('profile',         {url:'/profile',     templateUrl:'/views/profile/profile.html',          controller:'ProfileCtrl'});
      }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);
})();
