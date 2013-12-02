var moment = require('moment');


/**
 *  Returns a moment.js object bound to midnight of the current day
 *
 *  @return    {[type]}
 */
exports.midnight = (function() {
  var today = moment();

  today.hour(0);
  today.minutes(0);
  today.seconds(0);
  today.milliseconds(0);

  return today;
})();
