/**
 * Adding in angularjs helper methods because I've become so comfortable with them =)
 *
 * All credit goes to the angularjs team
 *
 * Source from: https://github.com/angular/angular.js/blob/master/src/Angular.js
 * License: MIT https://github.com/angular/angular.js/blob/master/LICENSE
 */

exports.int = function int(str) {
  return parseInt(str, 10);
};


/**
 *  [valueFn description]
 *
 *  @param     {[type]}    value
 *
 *  @return    {[type]}
 */
exports.valueFn = function valueFn(value) {
  return function() {
    return value;
  };
};


/**
 * @ngdoc function
 * @name angular.isUndefined
 * @function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is undefined.
 */
exports.isUndefined = function isUndefined(value) {
  return typeof value == 'undefined';
};


/**
 * @ngdoc function
 * @name angular.isDefined
 * @function
 *
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is defined.
 */
exports.isDefined = function isDefined(value) {
  return typeof value != 'undefined';
};


/**
 * @ngdoc function
 * @name angular.isObject
 * @function
 *
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is an `Object` but not `null`.
 */
exports.isObject = function isObject(value) {
  return value != null && typeof value == 'object';
};


/**
 * @ngdoc function
 * @name angular.isString
 * @function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `String`.
 */
exports.isString = function isString(value) {
  return typeof value == 'string';
};


/**
 * @ngdoc function
 * @name angular.isNumber
 * @function
 *
 * @description
 * Determines if a reference is a `Number`.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `Number`.
 */
exports.isNumber = function isNumber(value) {
  return typeof value == 'number';
};


/**
 * @ngdoc function
 * @name angular.isDate
 * @function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `Date`.
 */
exports.isDate = function isDate(value) {
  return toString.apply(value) == '[object Date]';
};


/**
 * @ngdoc function
 * @name angular.isArray
 * @function
 *
 * @description
 * Determines if a reference is an `Array`.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is an `Array`.
 */
exports.isArray = function isArray(value) {
  return toString.apply(value) == '[object Array]';
};


/**
 * @ngdoc function
 * @name angular.isFunction
 * @function
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `Function`.
 */
exports.isFunction = function isFunction(value) {
  return typeof value == 'function';
};


/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `RegExp`.
 */
exports.isRegExp = function isRegExp(value) {
  return toString.apply(value) == '[object RegExp]';
};


/**
 *  [isBoolean description]
 *
 *  @param     {[type]}     value
 *
 *  @return    {Boolean}
 */
exports.isBoolean = function isBoolean(value) {
  return typeof value == 'boolean';
};
