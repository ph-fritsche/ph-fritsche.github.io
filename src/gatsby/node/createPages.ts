import path from 'path'
import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
    graphql,
    actions,
}) => {
    const blogPosts = await graphql<{
        allMdx: {
            edges: GatsbyTypes.MdxEdge[]
        }
    }>(`
        query BlogMdx {
            allMdx(
                filter: {fileAbsolutePath: {regex: "//content/blog//"}}
            ) {
                edges {
                    node {
                        id
                        meta {
                            title
                            date
                            tags
                            slug
                        }
                    }
                }
            }
        }
    `)

    if (blogPosts.errors) {
        throw blogPosts.errors
    }

    const postTagCount: Record<string, number> = {
    }

    blogPosts.data?.allMdx.edges.forEach(({node}) => {
        if (node.meta.date && new Date(node.meta.date) <= new Date()) {
            postTagCount[''] = (postTagCount[''] ?? 0) + 1
            node.meta.tags.forEach(t => { postTagCount[t] = (postTagCount[t] ?? 0) + 1 })
        }

        actions.createPage({
            path: `/blog/post/${node.meta.slug}`,
            component: path.resolve('./src/templates/BlogPost.tsx'),
            context: { id: node.id },
        })
    })

    const dateStr = (new Date()).toISOString()

    const length = 10
    Object.entries(postTagCount).forEach(([tag, count]) => {
        for (
            let i = 0;
            i < Math.ceil(count / length);
            i++
        ) {
            actions.createPage({
                path: `/blog${tag ? `/tag/${tag}` : ``}${i > 0 ? `/page${i+1}` : ''}`,
                component: path.resolve('./src/templates/BlogList.tsx'),
                context: {
                    filter: {
                        fileAbsolutePath: { regex: '//content/blog//' },
                        meta: {
                            tags: tag
                                ? { eq: tag }
                                : {},
                            date: { lte: dateStr },
                        },
                    },
                    skip: i * length,
                    length,
                },
            })
        }
    })
}
