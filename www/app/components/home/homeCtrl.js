angular.module('redditApp').controller('homeCtrl', [
  '$scope',
  'redditService',
  'geolocationService',
  function($scope, redditService, geolocationService) {
    'use strict';

    $scope.searchTerm = 'funny';
    $scope.search = function() {
      redditService.listSubreddits($scope.searchTerm).then(function success(response) {
        $scope.posts = response.data.data.children;
      });
    };

    $scope.search();

    // geolocationService.getCurrentLocation().then(function success(position) {
    //   alert('Latitude: ' + position.coords.latitude + '\n' +
    //     'Longitude: ' + position.coords.longitude + '\n' +
    //     'Altitude: ' + position.coords.altitude + '\n' +
    //     'Accuracy: ' + position.coords.accuracy + '\n' +
    //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    //     'Heading: ' + position.coords.heading + '\n' +
    //     'Speed: ' + position.coords.speed + '\n' +
    //     'Timestamp: ' + position.timestamp + '\n');
    // });
  }
]);
