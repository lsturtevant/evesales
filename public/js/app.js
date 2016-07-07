(function() {
  "use strict";

  // Setup the app.
  var app = angular.module('tracker', ['ngCookies', 'ngRoute']);

  app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'main.html',
      controller: 'MainController',
      controllerAs: 'mainCtrl'
    });

    $routeProvider.when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    });

    $routeProvider.when('/characters', {
      templateUrl: 'characters.html',
      controller: 'CharactersController',
      controllerAs: 'charactersCtrl'
    });

    $routeProvider.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
  });
})();
