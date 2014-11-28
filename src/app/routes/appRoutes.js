angular.module('redditApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$provide',
  '$httpProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $provide, $httpProvider, $locationProvider) {

    //$locationProvider.html5Mode(true);

    //$urlRouterProvider.otherwise("/404");

    $urlRouterProvider.when('', '/');

    $stateProvider
      .state('posts', {
        url: '/',
        templateUrl: 'app/components/posts/posts.html',
        controller: 'postsCtrl'
      })
      .state('post', {
        url: '/post/:url',
        templateUrl: 'app/components/post/post.html',
        controller: 'postCtrl'
      });
  }
]);
