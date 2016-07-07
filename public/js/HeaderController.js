(function() {
  "use strict";

  function HeaderController(AuthenticationService, $scope, $location) {

    this.AuthenticationService = AuthenticationService;
    this.$location = $location;
  };  // HeaderController()

  HeaderController.prototype.getCurrentRoute = function() {

    return this.$location.$$path;
  };  // getCurrentRoute()

  HeaderController.prototype.logOut = function() {

    this.AuthenticationService.clear();
  };  // logOut()

  // This directive is how the header controller is actually used
  angular.module('tracker').directive('appHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'header.html',
      controller: ['AuthenticationService', '$scope', '$location', HeaderController],
      controllerAs: 'headerCtrl'
    };
  });

})();
