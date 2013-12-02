var request = require('request');
var Q = require('q');


/**
 *  Wraps the request library in a promise
 *
 *  @return    {Promise}
 */
exports.requestq = function(/* arguments */) {
  var deferred = Q.defer();

  request(arguments, function(err, resp, body) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve({ 'response': resp, 'body': body });
    }
  });

  return deferred.promise;
};
