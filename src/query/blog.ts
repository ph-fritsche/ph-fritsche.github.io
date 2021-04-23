import { graphql, useStaticQuery } from 'gatsby'

export const useBlogQuery = () => useStaticQuery<GatsbyTypes.BlogQuery>(graphql`
    query Blog {
        allMdx(
            filter: {fileAbsolutePath: {regex: "//content/blog//"}}
            sort: {fields: meta___date, order: DESC}
            limit: 10
            skip: 0
        ) {
            pageInfo {
            currentPage
            pageCount
            hasNextPage
            hasPreviousPage
            totalCount
            perPage
            }
            edges {
                node {
                    meta {
                        title
                        slug
                    }
                    excerpt(pruneLength: 180)
                }
            }
        }
    }
`)
