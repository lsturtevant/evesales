(function() {
  "use strict";

  function CharactersController(AuthenticationService) {

    this.AuthenticationService = AuthenticationService;
  };  // CharactersController()

  CharactersController.prototype.logOut = function() {

    this.AuthenticationService.clear();
  };  // logOut()

  // Add our controller to the app
  angular.module('tracker').controller('CharactersController', ['AuthenticationService', CharactersController]);

})();
