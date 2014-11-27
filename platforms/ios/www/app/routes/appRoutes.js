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
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.html',
        controller: 'homeCtrl'
      });
  }
]);
