/* =========================================================================
 * Dependencies
 * ========================================================================= */
var _ = require('underscore');

/* =========================================================================
 * App Config Settings
 * ========================================================================= */
var defaultSettings = {
  BUILD_DIR: 'www',
  PORT: '4040'
};

var production = _.extend(_.extend({}, defaultSettings), {
  ENV: 'production'
});

var development = _.extend(_.extend({}, defaultSettings), {
  ENV: 'development'
});

var local = _.extend(_.extend({}, defaultSettings), {
  ENV: 'local'
});

var test = _.extend(_.extend({}, defaultSettings), {
  ENV: 'test'
});

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = {
  production: production,
  development: development,
  local: local,
  test: test
};
