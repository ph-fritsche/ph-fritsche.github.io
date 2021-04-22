// gatsby-config.js
const { generateConfig } = require('gatsby-plugin-ts-config');

module.exports = generateConfig({
  projectRoot: __dirname,
  configDir: `${__dirname}/src/gatsby`,
  babel: false,
  tsNode: true,
});
