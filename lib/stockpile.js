// third-party exports
exports.third = {
  alphaID: require('./third/alphaID'),
  async: require('async'),
  bcrypt: require('bcrypt'),
  hapi: require('hapi'),
  iron: require('iron'),
  lodash: require('lodash'),
  moment: require('moment'),
  q: exports.Q = require('q'),
  scrypt: require('scrypt')
};

// local exports
exports.log = require('./general/log');
exports.RegExes = exports.regexes = exports.re = require('./general/RegExes');
exports.strings = require('./general/strings');
exports.checks = require('./general/checks');

// crypto exports
exports.crypto = {
  aspnet: require('./crypto/aspnet'),
  bcrypt: require('./crypto/bcrypt'),
  iron: require('./crypto/iron'),
  pbkdf2: require('./crypto/pbkdf2'),
  scrypt: require('./crypto/scrypt'),
  sha: require('./crypto/sha')
};

// hapi helpers
exports.hapi = {
  errors: require('./hapi/errors')
};

// conversion helpers
exports.conversions = {
  ldap: require('./conversions/ldap'),
  periods: require('./conversions/periods')
};
