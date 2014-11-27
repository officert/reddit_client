/* =========================================================================
 * Exports
 * ========================================================================= */
module.exports = function(appConfig) {
  return function(err, req, res, next) {
  	console.log('ERROR - ' + err);
    res.status(500).send(err);
  };
};
