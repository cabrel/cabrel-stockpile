var moment = require('moment');
var internals = {};


/**
 *  Returns a moment object containing the converted
 *  Active Directory timestamp.
 *
 *  See: http://support.microsoft.com/kb/555936
 *
 *  @param     {Number}    interval64
 *
 *  @return    {Moment}
 */
internals.fromAdTimestamp = function(timestamp64) {
  if (typeof timestamp64 === 'undefined') {
    throw new Error('64-bit Timestamp must be given');
  }

  if (typeof timestamp64 === 'string') {
    timestamp64 = Number(timestamp64);
  }

  if (typeof timestamp64 !== 'number') {
    throw new Error('Invalid timestamp. Expected string or number');
  }

  if (String(timestamp64).length !== 18) {
    throw new Error('Expected an 18 digit 64-bit timestamp');
  }

  var sec = Math.round(timestamp64 / 10000000);
  sec -= 11644473600;
  var datum = new Date(sec * 1000);

  return moment.unix(sec);
};

module.exports = internals;
