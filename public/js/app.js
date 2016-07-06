(function() {
  "use strict";

  // Setup the app.  We use a few dependencies that are in the js/lib dir
  var app = angular.module('tracker', ['ngCookies', 'ngRoute']);

  app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'main.html',
      controller: 'MainController'
    });

    $routeProvider.when('/login', {
      templateUrl: 'login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    });

    $routeProvider.otherwise({ redirectTo: '/login' });

    $locationProvider.html5Mode(true);
  });

  app.run(['$rootScope', '$location', '$cookies', '$http', function($rootScope, $location, $cookies, $http) {




//         $rootScope.globals = $cookies.get('globals') || {};
//         if ($rootScope.globals.currentUser) {
//             $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//         }
  
//         $rootScope.$on('$locationChangeStart', function (event, next, current) {
//             // redirect to login page if not logged in
//             if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                 $location.path('/login');
//             }
//         });
    }]);
})();
