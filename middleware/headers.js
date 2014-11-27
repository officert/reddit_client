/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(req, res, next) {
    var cache = appConfig.ENV == 'production' ? 3600 : 0;
    res.set('Cache-Control', 'public, max-age=' + cache);
    res.set('Vary', 'Accept-Encoding');
    next();
  };
};
