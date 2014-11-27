/* =========================================================================
 * Dependencies
 * ========================================================================= */
var express = require('express');
var fs = require('fs');

//middleware
var ssl = require('../middleware/ssl');
var deeplink = require('../middleware/deeplink');
var headers = require('../middleware/headers');
var cacheControl = require('../middleware/cacheControl');
var isFile = require('../middleware/isFile');
var error = require('../middleware/error');

/* =========================================================================
 * Config
 * ========================================================================= */
var expressConfig = {
  configure: configure
};

function configure(appConfig) {
  var app = express();

  loadMiddleware(app, appConfig);

  return app;
}

function loadMiddleware(app, appConfig) {
  app.use(ssl(appConfig));
  app.use('/dl/*', deeplink(appConfig));
  app.use(headers(appConfig));

  app.use(express.static(appConfig.BUILD_DIR));
  app.use('/bower_compoents/*', cacheControl);

  if (appConfig.ENV !== 'production') {
    var cachedComponentsFile = null;
    app.get('/components', function(req, res, next) {
      var componentsFilePath = appConfig.BUILD_DIR + '/components.html';
      htmlFile(res);

      if (cachedComponentsFile) {
        res.send(cachedComponentsFile);
      } else {
        fs.readFile(componentsFilePath, function(err, data) {
          if (err) return next(err);
          if (appConfig.ENV === 'production') cachedComponentsFile = data;

          res.send(data);
        });
      }
    })
  }

  var cachedIndexFile = null;
  app.use(function(res, res, next) {

    var indexFilePath = appConfig.BUILD_DIR + '/index.html';

    htmlFile(res);

    if (cachedIndexFile) {
      res.send(cachedIndexFile);
    } else {

      fs.readFile(indexFilePath, function(err, data) {
        if (err) {
          return next(err);
        }
        if (appConfig.ENV === 'production') cachedIndexFile = data;

        res.send(data);
      });
    }
  });

  app.use(error());
}

/* =========================================================================
 * Private Helpers
 * ========================================================================= */
function htmlFile(res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
}

/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = expressConfig;
