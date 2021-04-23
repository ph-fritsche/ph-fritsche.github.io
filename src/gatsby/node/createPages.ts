import path from 'path'
import { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode['createPages'] = async ({
    graphql,
    actions,
    getNode,
    createContentDigest,
}) => {
    const blogPosts = await graphql<{
        allMdx: {
            edges: (GatsbyTypes.MdxEdge & {
                node: {
                    parent: {
                        name: GatsbyTypes.Scalars['String']
                    }
                }
            })[]
        }
    }>(`
        query BlogMdx {
            allMdx(
                filter: {fileAbsolutePath: {regex: "//content/blog//"}}
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            title
                            date
                            tags
                        }
                        parent {
                            ... on File {
                                name
                            }
                        }
                        body
                    }
                }
            }
        }
    `)

    if (blogPosts.errors) {
        throw blogPosts.errors
    }

    blogPosts.data?.allMdx.edges.forEach(e => {
    })

    const tags = new Set<string>()
    blogPosts.data?.allMdx.edges.forEach(e => {
        e.node.frontmatter?.tags?.forEach((t: string) => tags.add(t))
    })

    // tags.forEach(t => {
    //     actions.createNode({
    //         id: createNodeId(`BlogTag ${t}`),
    //         internal: {
    //             type: 'String',
    //             mediaType: 'text/plain',
    //             description: 'Tag',
    //             content: t,
    //             contentDigest: createContentDigest(t),
    //         },
    //     })
    // })

    blogPosts.data?.allMdx.edges.forEach(e => {
        actions.createPage({
            path: `/blog/${e.node.parent.name}`,
            component: path.resolve('./src/templates/BlogPost.tsx'),
            context: { id: e.node.id },
        })
    })
}
