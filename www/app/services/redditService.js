angular.module('redditApp').factory('redditService', [
  '$http',
  function($http) {

    var baseUrl = "http://api.reddit.com";

    var RedditService = function() {};

    RedditService.prototype.listSubreddits = function(subreddit) {
      var fullUrl = baseUrl + "/r/" + subreddit + ".json";

      return $http.get(fullUrl);
    };

    return new RedditService();
  }
]);
