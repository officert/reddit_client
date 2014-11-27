// /* =========================================================================
//  * Dependencies
//  * ========================================================================= */
// var fs = require('fs');

// /* =========================================================================
//  * Private Helpers
//  * ========================================================================= */
// function isFile(req) {
//   var fileName = req.path.split('/').pop();
//   var isFile = fileName.split('.').length > 1;
//   return isFile;
// }

// function serveUpFile(req, res, buildDir) {
//   var fileName = req.path.split('/').pop();
//   res.contentType(fileName);

//   fs.readFile(buildDir + '/' + req.path, function(err, data) {
//     if (!data) {
//       var notFound = new Error('File Not found');
//       res.status(404).send(notFound);
//     } else {
//       res.send(data);
//     }
//   });
// }

// /* =========================================================================
//  * Exports
//  * ========================================================================= */
// module.exports = function(appConfig) {
//   return function(req, res, next) {
//     if (isFile(req)) {
//       serveUpFile(req, res, appConfig.BUILD_DIR);
//     }
//     next();
//   };
// };
