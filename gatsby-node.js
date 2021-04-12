/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')
const TsPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateWebpackConfig = ({stage, actions}) => {
    actions.setWebpackConfig({
        resolve: {
            plugins: [new TsPathsPlugin()],
        },
    })
}

exports.createPages = async ({graphql, actions: { createPage }, reporter}) => {
    const result = await graphql(`
query MyQuery {
  allMdx(
    filter: {fileAbsolutePath: {regex: "//content/blog//"}}
  ) {
    edges {
      node {
        id
        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
}
    `)

    if (result.errors) {
        reporter.panicOnBuild('ERROR: Loading blog posts')
    }

    result.data.allMdx.edges.forEach(e => {
        createPage({
            path: `/blog/${e.node.parent.name}`,
            component: path.resolve('./src/templates/BlogPost.tsx'),
            context: { id: e.node.id },
        })
    })
}
