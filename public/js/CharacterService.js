(function() {
  "use strict";

  /**
   *
   */
  function CharacterService(AuthenticationService) {

    this.$http = $http;
    this.AuthenticationService = AuthenticationService;
  };  // CharacterService()

  angular.module('tracker').factory('CharacterService', function($http, AuthenticationService) {

    return new CharacterService($http, AuthenticationService);
  });
})();
