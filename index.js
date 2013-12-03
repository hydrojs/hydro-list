/**
 * External dependencies.
 */

var Formatter = require('hydro-formatter');

/**
 * List formatter.
 *
 * @constructor
 */

var List = Formatter.extend();

/**
 * Before all tests.
 *
 * @param {Array} tests
 * @api public
 */

List.prototype.beforeAll = function(suites) {
  var len = 0;

  suites.forEach(function(suite) {
    suite.tests.forEach(function(test) {
      len = Math.max(test.title.length, len);
    });
  });

  this.len = len;
};

/**
 * Before suite.
 *
 * @api public
 */

List.prototype.beforeSuite = function(suite) {
  this.println();
  this.println(this.color('gray', suite.title));
};

/**
 * Before each test.
 *
 * @param {Object} test
 * @api public
 */

List.prototype.beforeTest = function(test) {
  var padding = Array(this.len + 1 - test.title.length).join(' ');
  this.print(this.padding + test.title + padding);
};

/**
 * After each test.
 *
 * @param {Object} test
 * @api public
 */

List.prototype.afterTest = function(test) {
  var time = this.color('gray', this.ms(test.time));
  var status = test.failed ?
    this.color('red', 'ERROR') :
    this.color('green', 'OK');

  this.print(' ' + status + ' ' + time + '\n');
};

/**
 * After all tests.
 *
 * @param {Result} test result
 * @api public
 */

List.prototype.afterAll = function(result) {
  this.displayResult(result);
  this.displayFailed(result);
};

/**
 * Primary export.
 */

module.exports = List;
