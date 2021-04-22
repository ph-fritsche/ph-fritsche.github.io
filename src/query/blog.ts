import { graphql, useStaticQuery } from "gatsby"

export const useBlogQuery = () => useStaticQuery<GatsbyTypes.BlogQuery>(graphql`
    query Blog {
        allMdx(
            filter: {fileAbsolutePath: {regex: "//content/blog//"}}
            sort: {fields: frontmatter___date, order: DESC}
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
                frontmatter {
                title
                date
                }
                parent {
                ... on File {
                    name
                }
                }
                excerpt(pruneLength: 180)
            }
            }
        }
    }
`)
