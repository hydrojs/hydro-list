/**
 * External dependencies.
 */

var Formatter = require('hydro').Formatter;

/**
 * List formatter.
 *
 * @constructor
 */

var List = Formatter.extend();

/**
 * Setup.
 *
 * @api private
 */

List.prototype.setup = function() {
  this.len = 0;
  this.currentFile = null;
};

/**
 * Before all tests.
 *
 * @param {Array} tests
 * @api public
 */

List.prototype.beforeAll = function(tests) {
  tests.forEach(function(test) {
    this.len = Math.max(test.title.length, this.len);
  }, this);
};

/**
 * Before each test.
 *
 * @param {Object} test
 * @api public
 */

List.prototype.beforeTest = function(test) {
  if (this.currentFile !== test.file) this.displayGroup(test.file);
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
