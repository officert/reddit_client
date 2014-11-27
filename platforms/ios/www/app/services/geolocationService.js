angular.module('redditApp').factory('geolocationService', [
  '$window',
  '$q',
  function($window, $q) {

    var GeolocationService = function() {};

    GeolocationService.prototype.getCurrentLocation = function() {
      var deferred = $q.defer();

      $window.navigator.geolocation.getCurrentPosition(function(results) {
        deferred.resolve(results);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    return new GeolocationService();
  }
]);
