/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(req, res, next) {
    var path = req.baseUrl.replace('/dl/', '');
    var url = appConfig.DEEPLINK + path;
    return res.redirect(url);
  };
};
