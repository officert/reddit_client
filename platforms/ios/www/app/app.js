angular.module('redditApp', [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap'
]);


angular.module('redditApp').run([
  '$rootScope',
  function($rootScope) {
    'use strict';
  }
]);

// ------------ PhoneGap Init ------------ //
var PhoneGapInit = function() {
  this.boot = function() {
    angular.bootstrap(document, ['redditApp']);
  };

  if (window.phonegap !== undefined) {
    document.addEventListener('deviceready', function() {
      this.boot();
    });
  } else {
    console.log('PhoneGap not found, booting Angular manually');
    this.boot();
  }
};

angular.element(document).ready(function() {
  new PhoneGapInit();
});
