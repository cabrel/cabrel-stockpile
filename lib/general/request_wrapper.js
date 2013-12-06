/**
 *  Wraps the request library in a promise
 *
 *  @return    {Promise}
 */
exports.requestq = function(/* arguments */) {
  var Q = require('q');

  var Request = require('request');
  var deferred = Q.defer();

  Request(arguments, function(err, resp, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({ 'response': resp, 'body': body });
    }
  });

  return deferred.promise;
};
