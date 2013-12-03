/**
 *  Wraps the request library in a promise
 *
 *  @return    {Promise}
 */
exports.requestq = function(/* arguments */) {
  var deferred = Q.defer();
  var Request = require('request');
  var Q = require('q');

  Request(arguments, function(err, resp, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({ 'response': resp, 'body': body });
    }
  });

  return deferred.promise;
};
