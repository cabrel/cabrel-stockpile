var externals = {},
    internals = {},
    Iron = require('iron'),
    Q = require('q');


/**
 * Wrapper around Iron.seal
 *
 * @param  {[type]} data
 * @param  {[type]} password
 * @param  {[type]} options
 * @param  {[type]} callback
 *
 * @return {[type]}
 */
externals.seal = function(data, password, options, callback) {
  if (!data) {
    throw new Error('No data to seal');
  }

  if (!password) {
    throw new Error('Password required');
  }

  // use the default Iron options
  if (!options) {
    options = Iron.defaults;
  } else if (typeof options === 'function') {
    callback = options;
    options = Iron.defaults;
  } else if (typeof options !== 'object') {
    throw new Error('Invalid options');
  }

  return Q.nfapply(Iron.seal, [data, password, options]).nodeify(callback);
};


/**
 * Wrapper around Iron.unseal
 *
 * @param  {[type]} data
 * @param  {[type]} password
 * @param  {[type]} options
 * @param  {[type]} callback
 *
 * @return {[type]}
 */
externals.unseal = function(data, password, options, callback) {
  if (!data) {
    throw new Error('No data to seal');
  }

  if (!password) {
    throw new Error('Password required');
  }

  // use the default Iron options
  if (!options) {
    options = Iron.defaults;
  } else if (typeof options === 'function') {
    callback = options;
    options = Iron.defaults;
  } else if (typeof options !== 'object') {
    throw new Error('Invalid options');
  }

  return Q.nfapply(Iron.unseal, [data, password, options]).nodeify(callback);
};


module.exports = externals;
