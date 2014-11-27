/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function() {
  return function(req, res, next) {
    res.set('Cache-Control', 'public, max-age=2419200');
    next();
  };
};
