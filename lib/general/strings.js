var sugar = require('sugar');
var moment = require('moment');
var alphaID = require('../third/alphaID');

var internals = {};


/**
 * Returns a unique URL slug
 *
 * @param  {String} name
 *
 * @return {String}
 */
internals.slug = function(name) {
  if (!name) {
    throw new Error('Name required');
  }

  var uniqueId = alphaID.encode(moment().valueOf());
  var slug = uniqueId + '-' + name.parameterize();

  return slug;
};

module.exports = internals;
