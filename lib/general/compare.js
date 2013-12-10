'use strict';
var checks = require('./checks');
var _ = require('lodash');

exports.EmailAddress = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
exports.ObjectID = new RegExp('^[0-9a-fA-F]{24}$');

//
// __api.utils.matchObjectId
//
// A simple comparison algorithm for comparing a user id (ObjectID converted to a string)
// to either an `Array`, `Mongoose Document`, or `String`
//
exports.matchObjectId = function matchUser(haystack, needle) {
  if (checks.isUndefined(haystack)) {
    throw new Error('Haystack undefined');
  }

  if (checks.isUndefined(needle)) {
    throw new Error('Needle undefined');
  }

  // if (!checks.isString(needle)) {
  //   throw new Error('Needle must be a string');
  // }

  // check if the source is an array, which could mean a collection of
  // user objects to compare against
  if (checks.isArray(haystack)) {
    if (haystack.length === 0) {
      return false;
    }

    var found = _.filter(haystack, function(member) {
      if (checks.isString(member)) {
        return member === needle;
      }

      if (checks.isObject(member)) {
        if (checks.isFunction(member.toObject)) {
          member = member.toObject();
        }

        if (checks.isDefined(member.id)) {
          return member.id === needle;
        }

        if (checks.isDefined(member._id)) {
          return String(member._id) === needle;
        }
      }
    });

    return found.length > 0;

  }

  if (checks.isString(haystack)) {
    return haystack === needle;
  }

  if (checks.isObject(haystack)) {
    if (checks.isFunction(haystack.toObject)) {
      haystack = haystack.toObject();
    }

    if (checks.isDefined(haystack.id)) {
      return haystack.id === needle;
    }

    if (checks.isDefined(haystack._id)) {
      return String(haystack._id) === needle;
    }
  }

  return false;
};


/**
 * [hasKey description]
 *
 * @param  {[type]}  obj
 * @param  {[type]}  searchKey
 *
 * @return {Boolean}
 */
exports.hasKey = function hasKey(obj, searchKey) {
  for (var key in obj) {
    if (key === searchKey) {
      return true;
    }
  }

  return false;
};


