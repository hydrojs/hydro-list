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

List.prototype.beforeAll = function(suite) {
  this.len = suite.runnables.reduce(function traverse(len, test) {
    if (test.runnables) return test.runnables.reduce(traverse, len);
    return Math.max(test.title.length, len);
  }, 0);
};

/**
 * Before suite.
 *
 * @api public
 */

List.prototype.beforeSuite = function(suite) {
  var parents = [];
  var parent = suite.parent;
  var title = null;

  while (parent) {
    if (parent.title) parents.push(parent.title);
    parent = parent.parent;
  }

  title = parents.length
    ? parents.reverse().join(' ') + ' ' + suite.title
    : suite.title;

  this.println();
  this.println(this.color(title, 'gray'));
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
  var time = this.color(this.ms(test.time), 'gray');
  var msgs = {
    failed: 'ERROR',
    passed: 'OK',
    skipped: 'SKIPPED',
    pending: 'PENDING',
  };

  this.print(' ' + this.color(msgs[test.status], this.statusColor[test.status]) + ' ' + time + '\n');
};

/**
 * After all tests.
 *
 * @param {Result} test result
 * @api public
 */

List.prototype.afterAll = function() {
  this.displayResult();
  this.displayFailed();
};

/**
 * Primary export.
 */

module.exports = List;
