'use strict';
var checks = require('./checks');

exports.EmailAddress = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
exports.ObjectID = new RegExp('^[0-9a-fA-F]{24}$');

//
// __api.utils.matchObjectId
//
// A simple comparison algorithm for comparing a user id (ObjectID converted to a string)
// to either an `Array`, `Mongoose Document`, or `String`
//
exports.matchObjectId = function matchUser(arr, id) {
  if (checks.isUndefined(arr)) {
    throw new Error('A source object must be given');
  }

  if (checks.isUndefined(id)) {
    throw new Error('Target user must be given');
  }

  if (!checks.isString(id)) {
    throw new Error('ID must be a string');
  }

  // check if the source is an array, which could mean a collection of
  // user objects to compare against
  if (checks.isArray(arr)) {
    if (arr.length === 0) {
      return false;
    }

    for (var i = 0; i < arr.length; i += 1) {
      var member = arr[i];
      if (checks.isString(member)) {
        return member === id;
      }

      if (checks.isObject(member)) {
        if (checks.isFunction(member.toObject)) {
          member = member.toObject();
        }

        if (checks.isDefined(member.id)) {
          return member.id === id;
        }

        if (checks.isDefined(member._id)) {
          return String(member._id) === id;
        }

        throw new Error('Unknown user object');
      }
    }

  } else if (checks.isString(arr)) {
    return arr === id;
  } else if (checks.isObject(arr)) {
    if (checks.isFunction(arr.toObject)) {
      arr = arr.toObject();
    }

    if (checks.isDefined(arr.id)) {
      return arr.id === id;
    }

    if (checks.isDefined(arr._id)) {
      return String(arr._id) === id;
    }
  } else {
    throw new Error('Unknown source object');
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


