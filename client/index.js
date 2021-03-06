(function(){
  'use strict';

  angular.module('browniepoints', ['ui.router', 'angularFileUpload'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home',                {url:'/',                templateUrl:'/views/home/home.html'})
        .state('register',            {url:'/register',        templateUrl:'/views/users/users.html',                     controller:'UsersCtrl'})
        .state('login',               {url:'/login',           templateUrl:'/views/users/users.html',                     controller:'UsersCtrl'})
        .state('users_list',          {url:'/users',           templateUrl:'/views/users/users_list.html',                controller:'UsersListCtrl'})
        .state('dashboard',           {url:'/dashboard',       templateUrl:'/views/dashboard/dashboard.html',             controller:'DashboardCtrl'})
        // .state('prizes',              {url:'/prizes',          templateUrl:'/views/prizes/prizes.html',                   abstract:true})
        // .state('prizes.list',         {url:'?tag&page',        templateUrl:'/views/prizes/prizes_list.html',              controller:'PrizesListCtrl'})
        // .state('prizes.detail',       {url:'/{prizeId}',       templateUrl:'/views/prizes/prizes_detail.html',            controller:'PrizesDetailCtrl'})
        .state('friendships',         {url:'/friends',         templateUrl:'/views/friendships/friendships.html',         abstract:true})
        .state('friendships.list',    {url:'',                 templateUrl:'/views/friendships/friendships_list.html',    controller:'FriendshipsListCtrl'})
        .state('friendships.detail',  {url:'/{friendshipId}',  templateUrl:'/views/friendships/friendships_detail.html',  controller:'FriendshipDetailCtrl'});
    }])
    .run(['$rootScope', '$http', function($rootScope, $http){
      $http.get('/status').then(function(response){
        $rootScope.rootuser = response.data;
      }, function(){
        $rootScope.rootuser = null;
      });
    }]);
})();
