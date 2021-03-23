/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const TsPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({stage, actions}) => {
    actions.setWebpackConfig({
        resolve: {
            plugins: [new TsPathsPlugin()],
        },
    })
}
