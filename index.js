module.exports = process.env['LIB_COV']
  ? require('./lib-cov/stockpile')
  : require('./lib/stockpile');

