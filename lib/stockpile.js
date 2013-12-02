// third-party exports
exports.third = {
  alphaID: require('./third/alphaID'),
  async: require('async'),
  hapi: require('hapi'),
  lodash: require('lodash'),
  moment: require('moment'),
  q: exports.Q = require('q')
};

// local exports
exports.log = require('./general/log');
exports.RegExes = require('./general/RegExes');
exports.strings = require('./general/strings');
exports.checks = require('./general/checks');

// hapi helpers
exports.hapi = {
  errors: require('./hapi/errors')
};

// conversion helpers
exports.conversions = {
  ldap: require('./conversions/ldap'),
  periods: require('./conversions/periods')
};
