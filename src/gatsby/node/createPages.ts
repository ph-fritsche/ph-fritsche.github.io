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
        postTagCount[''] = (postTagCount[''] ?? 0) + 1
        node.meta.tags.forEach(t => { postTagCount[t] = (postTagCount[t] ?? 0) + 1 })

        actions.createPage({
            path: `/blog/post/${node.meta.slug}`,
            component: path.resolve('./src/templates/BlogPost.tsx'),
            context: { id: node.id },
        })
    })
    console.log(postTagCount)

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
                        meta: tag
                            ? {
                                tags: {
                                    elemMatch: {
                                        eq: tag,
                                    },
                                },
                            }
                            : {},
                    },
                    skip: i * length,
                    length,
                },
            })
        }
    })
}
