(function() {
  "use strict";

  /**
   *
   */
  function LoginController(AuthenticationService, $location) {

    this.AuthenticationService = AuthenticationService;
    this.$location = $location;
    this.loginMode = true;
    this.loginSubmitting = false;
    this.registerSubmitting = false;
    this.loginError = null;
    this.registerError = null;
    this.userName = null;
    this.password = null;
    this.email = null;
  }  // LoginController()

  /**
   *
   */
  LoginController.prototype.register = function() {

    this.registerSubmitting = true;
    this.AuthenticationService.clear();

    console.log("in register");
    this.AuthenticationService.register(this.userName, this.password, this.email);
    this.AuthenticationService.success(LoginController.prototype.registerSuccess.bind(this));
    this.AuthenticationService.error(LoginController.prototype.registerError.bind(this));
  }  // register()

  /**
   *
   */
  LoginController.prototype.registerSuccess = function() {

    this.registerSubmitting = false;
    this.registerError = null;
    console.log('got registerSuccess ');
    this.$location.path('/');
  }  // registerSuccess()

  /**
   *
   */
  LoginController.prototype.registerError = function(message) {

    this.registerSubmitting = false;
    this.registerError = message;
    console.log('got registerError ' + message);
  }  // registerError()

  /**
   *
   */
  LoginController.prototype.login = function() {

    this.loginSubmitting = true;
    this.AuthenticationService.clear();

    console.log("in login");
    this.AuthenticationService.login(this.userName, this.password);
    this.AuthenticationService.success(LoginController.prototype.loginSuccess.bind(this));
    this.AuthenticationService.error(LoginController.prototype.loginError.bind(this));
  }  // login()

  /**
   *
   */
  LoginController.prototype.loginSuccess = function() {

    this.loginSubmitting = false;
    this.loginError = null;
    console.log('got loginSuccess ');
    this.$location.path('/');
  }  // loginSuccess()

  /**
   *
   */
  LoginController.prototype.loginError = function(message) {

    this.loginSubmitting = false;
    this.loginError = message;
    console.log('got loginError ' + message);
  }  // loginError()

  LoginController.prototype.switchModes = function(form) {

    this.userName = null;
    this.password = null;
    this.email = null;
    this.loginMode = !this.loginMode;
  }  // switchModes()

  // Add our controller to the app and we're ready to go.
  angular.module('tracker').controller('LoginController', ['AuthenticationService', '$location', LoginController]);

})();
