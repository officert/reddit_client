angular.module('redditApp').controller('postsCtrl', [
  '$scope',
  'redditService',
  'geolocationService',
  function($scope, redditService, geolocationService) {
    'use strict';

    $scope.form = {
      searchTerm: 'funny'
    };
    $scope.searchSubreddits = function(form) {
      redditService.listSubreddits($scope.form.searchTerm).then(function success(response) {
        $scope.posts = response.data.data.children;
      });
    };

    $scope.searchSubreddits();

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
