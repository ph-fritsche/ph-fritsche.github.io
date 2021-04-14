import path from 'path'
import { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode['createPages'] = async ({graphql, actions}) => {
    const result = await graphql<{
      allMdx: {
        edges: any[],
      },
    }>(`
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
        throw result.errors
    }

    result.data?.allMdx.edges.forEach(e => {
        actions.createPage({
            path: `/blog/${e.node.parent.name}`,
            component: path.resolve('./src/templates/BlogPost.tsx'),
            context: { id: e.node.id },
        })
    })
}
