/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const tsConfig = require('./tsconfig.json')

require('ts-node').register({
  compilerOptions: {
    ...tsConfig.compilerOptions,
    module: 'commonjs',
    target: 'ESNEXT',
  }
})

module.exports = require('./src/gatsby/node')
