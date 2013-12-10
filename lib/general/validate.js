'use strict';

var checks = require('./checks');
var compare = require('./compare');
var NodeUtil = require('util');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;


/**
 * [validateObjectId description]
 *
 * @param  {[type]} requestor
 * @param  {[type]} text
 *
 * @return {[type]}
 */
exports.validateObjectId = function validateObjectId(test, text) {
  if (checks.isUndefined(test)) {
    throw new Error('Input is missing');
  }

  if (checks.isUndefined(text)) {
    throw new Error('Input is missing');
  }

  if (!checks.isString(test) && !checks.isObject(test)) {
    throw new Error(NodeUtil.format('Expected %s to be a string or object', text));
  }

  if (checks.isString(test)) {
    if (!compare.ObjectID.test(test)) {
      throw new Error(NodeUtil.format('(%s) %s is not a valid Object ID', test, text));
    }

    return test;
  }

  if (checks.isObject(test)) {
    if (test instanceof mongoose.Document) {
      if (checks.isDefined(test.id)) {
        if (!compare.ObjectID.test(test.id)) {
          throw new Error(NodeUtil.format('(%s) %s is not a valid Object ID', NodeUtil.inspect(test.id, true, null), text));
        }

        return test.id;
      }
    } else if (test instanceof ObjectID) {
      var tempTest = String(test);

      // it's a normal ObjectId
      if (!compare.ObjectID.test(tempTest)) {
        throw new Error(NodeUtil.format('(%s) %s is not a valid Object ID', tempTest, text));
      }

      return tempTest;
    } else {
      if (checks.isDefined(test.id)) {
        return this.validateObjectId(test.id, text);
      }
    }
  }

  throw new Error('Unknown input type');
};


/**
 * [validateEmail description]
 *
 * @param  {[type]} email
 *
 * @return {[type]}
 */
exports.validateEmail = function validateEmail(email) {
  if (checks.isUndefined(email)) {
    throw new Error('Email address is missing');
  }

  if (!exports.EmailAddress.test(email)) {
    throw new Error('email must be a valid email address');
  }
};
