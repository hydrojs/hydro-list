
/**
 * Hydro configuration
 *
 * @param {Hydro} hydro
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'hydro-list',
    timeout: 500,
    formatter: require('..'),
    plugins: [
      require('hydro-bdd')
    ],
    tests: ['test/*.test.js']
  })
}
