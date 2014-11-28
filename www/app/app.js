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

// ------------ Angular Bootstrap ------------ //
angular.element(document).ready(function() {
  if (window.phonegap) {
    document.addEventListener('deviceready', function() {
      angular.bootstrap(document, ['redditApp']);
    });
  } else {
    console.log('PhoneGap not found, booting Angular manually');
    angular.bootstrap(document, ['redditApp']);
  }
});
