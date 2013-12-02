var sugar = require('sugar');
var moment = require('moment');
var alphaID = require('../third/alphaID');
var sugar = require('sugar');


/**
 * Returns a unique URL slug
 *
 * @param  {String} name
 *
 * @return {String}
 */
exports.slug = function slug(name) {
  if (!name) {
    throw new Error('Name required');
  }

  var uniqueId = alphaID.encode(moment().valueOf());
  var slug = name.parameterize() + '-' + uniqueId;

  return slug;
};


/**
 * Returns an object containing the domain and username
 *
 * @param  {String} name
 *
 * @return {Object}
 */
exports.parseNTUsername = function parseNTUsername(name) {
  if (!name) {
    throw new Error('Name required');
  }

  if (name.has(/\\/)) {
    // DOMAIN\Username format
    var split = name.split('\\');

    return {
      domain: split[0],
      username: split[1]
    };

  } else if (name.has(/@/)) {
    // username@domain.fqdn format

    var split = name.split('@');

    return {
      domain: split[1].split('.')[0],
      username: split[0]
    };
  }

  return null;
};
