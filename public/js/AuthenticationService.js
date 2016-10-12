(function() {
  "use strict";

  /**
   *
   */
  function AuthenticationService($http, $cookies) {

    this.$http = $http;
    this.$cookies = $cookies;
    this.token = $cookies.get('token');
    this.userName = $cookies.get('user_name');
    this.successCallback = null;
    this.errorCallback = null;
  };  // AuthenticationService()

  /**
   *
   */
  AuthenticationService.prototype.isAuthenticated = function() {

    if(this.userName && this.token)
      return true;
    return false;
  };  // isAuthenticated()

  /**
   *
   */
  AuthenticationService.prototype.clear = function() {

    this.userName = null;
    this.token = null;
    this.$cookies.remove('token');
    this.$cookies.remove('user_name');
  };  // clear()

  /**
   *
   */
  AuthenticationService.prototype.success = function(callback) {

    this.successCallback = callback;
  };  // success()

  /**
   *
   */
  AuthenticationService.prototype.error = function(callback) {

    this.errorCallback = callback;
  };  // error()

  /**
   *
   */
  AuthenticationService.prototype.register = function(userName, password, email) {

    var message;

    // setup the data we'll send
    var config = {
      userName: userName,
      password: password,
      email: email
    };

    console.log("doing reg");
    // setup the request
    var promise = this.$http.post('/register', config);
    promise.success(AuthenticationService.prototype.registerApiSuccess.bind(this));
    promise.error(AuthenticationService.prototype.registerApiError.bind(this));
  };  // register()

  /**
   *
   */
  AuthenticationService.prototype.registerApiSuccess = function(data, status, headers, config) {

    console.log("registerApiSuccess sucdc " + data);
    console.log("registerApiSuccess sucdc " + JSON.stringify(data));

    if(data.success) {
      this.token = data.token;
      this.userName = config.data.userName;
      this.$cookies.put('token', data.token);
      this.$cookies.put('user_name', this.userName);
      if(this.successCallback)
        this.successCallback();
    }
    else if(this.errorCallback)
      this.errorCallback(data.message);
  };  // registerApiSuccess()

  /**
   *
   */
  AuthenticationService.prototype.registerApiError = function(data, status, headers, config) {

    console.log("registerApiError erro");

    if(this.errorCallback)
      this.errorCallback(data.message);
  };  // registerApiError()

  /**
   *
   */
  AuthenticationService.prototype.login = function(userName, password) {

    var message;

    // setup the data we'll send
    var config = {
      userName: userName,
      password: password
    };

    // setup the request
    var promise = this.$http.post('/login', config);
    promise.success(AuthenticationService.prototype.loginApiSuccess.bind(this));
    promise.error(AuthenticationService.prototype.loginApiError.bind(this));
  };  // login()

  /**
   *
   */
  AuthenticationService.prototype.loginApiSuccess = function(data, status, headers, config) {

    console.log("api sucdc");
    console.log("api sucdc " + data);
    console.log("api sucdc " + JSON.stringify(data));
    console.log("api config " + JSON.stringify(config.data));

    if(data.success) {
      this.token = data.token;
      this.userName = config.data.userName;
      this.$cookies.put('token', data.token);
      this.$cookies.put('user_name', this.userName);
      if(this.successCallback)
        this.successCallback();
    }
    else if(this.errorCallback)
      this.errorCallback(data.message);
  };  // loginApiSuccess()

  /**
   *
   */
  AuthenticationService.prototype.loginApiError = function(data, status, headers, config) {

    console.log("api erro");

    if(this.errorCallback)
      this.errorCallback(data.message);
  };  // loginApiError()

  angular.module('tracker').factory('AuthenticationService', function($http, $cookies) {

    return new AuthenticationService($http, $cookies);
  });
})();
