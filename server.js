/* =========================================================================
 * Dependencies
 * ========================================================================= */
//var newrelic = require('newrelic');
var appConfig = require('./config/appConfig')[process.env.NODE_ENV || 'development'];
var app = require('./config/expressConfig').configure(appConfig);

console.log('ENV: ' + (process.env.NODE_ENV || 'development'));

// start server
app.listen(appConfig.PORT, function() {
  console.log('Listening on port: ' + appConfig.PORT);
});

/* =========================================================================
 * Exorts
 * ========================================================================= */
module.exports = app;
