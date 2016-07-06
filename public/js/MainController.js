(function() {
  "use strict";

  function MainController(AuthenticationService) {

    this.AuthenticationService = AuthenticationService;

  };  // MainController()

  MainController.prototype.logOut = function() {
    console.log('in logout');
    this.AuthenticationService.clear();
  };  // logOut()


  angular.module('tracker').controller('MainController', ['AuthenticationService', MainController]);

})();
