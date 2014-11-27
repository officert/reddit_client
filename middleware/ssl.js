/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(req, res, next) {
    if (appConfig.SSL) {
      var protocol = req.get('x-forwarded-proto') || req.protocol;
      if (protocol != 'https') {
        res.redirect(301, 'https://' + req.get('host') + req.url);
      } else {
        res.header('Strict-Transport-Security', 'max-age=31536000');
        next();
      }
    } else {
      next();
    }
  };
};
