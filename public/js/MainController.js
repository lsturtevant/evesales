(function() {
  "use strict";

  function MainController($cookies) {

    this.$cookies = $cookies;

    console.log(this.$cookies.get('globals'));
    console.log(JSON.stringify(this.$cookies.get('globals')));

  }  // MainController()

  angular.module('tracker').controller('MainController', ['$cookies', MainController]);

})();
