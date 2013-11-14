/**
 * Adding in angularjs helper methods because I've become so comfortable with them =)
 *
 * All credit goes to the angularjs team
 *
 * Source from: https://github.com/angular/angular.js/blob/master/src/Angular.js
 * License: MIT https://github.com/angular/angular.js/blob/master/LICENSE
 */

var externals = {};


externals.int = function(str) {
  return parseInt(str, 10);
};


externals.valueFn = function(value) {return function() {return value;};};


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
externals.isUndefined = function(value) {return typeof value == 'undefined';};


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
externals.isDefined = function(value) {return typeof value != 'undefined';};


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
externals.isObject = function(value) {return value != null && typeof value == 'object';};


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
externals.isString = function(value) {return typeof value == 'string';};


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
externals.isNumber = function(value) {return typeof value == 'number';};


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
externals.isDate = function(value) {
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
externals.isArray = function(value) {
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
externals.isFunction = function(value) {return typeof value == 'function';};


/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @return {boolean} True if `value` is a `RegExp`.
 */
externals.isRegExp = function(value) {
  return toString.apply(value) == '[object RegExp]';
};


externals.isBoolean = function(value) {
  return typeof value == 'boolean';
};


module.exports = externals;
