var moment = require('moment');
var internals = {};


/**
 *  Returns a moment.js object bound to midnight of the current day
 *
 *  @return    {[type]}
 */
internals.midnight = (function() {
  var today = moment();

  today.hour(0);
  today.minutes(0);
  today.seconds(0);
  today.milliseconds(0);

  return today;
})();

module.exports = internals;
