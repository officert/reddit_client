angular.module('redditApp').controller('postCtrl', [
  '$scope',
  '$stateParams',
  '$sce',
  function($scope, $stateParams, $sce) {
    'use strict';

    $scope.url = $sce.trustAsResourceUrl($stateParams.url);
  }
]);
