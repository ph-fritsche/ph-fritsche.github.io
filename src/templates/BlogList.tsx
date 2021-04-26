import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import { CardActionArea, CardContent, CardHeader } from '@material-ui/core'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import Suspended from '~src/components/Suspended'
import { getLinkProps } from '~src/components/Link'

export interface blogPostFrontmatter {
    title?: string
    tags?: string[],
    date?: string,
}

export default function BlogList({data}: PageProps<GatsbyTypes.BlogListQuery>) {
    useDarkModeSwitch()

    return (
        <Panel>
            {data.allMdx.edges.map(({ node }) => (
                <Card key={node.meta.slug}>
                    <Suspended>
                        <CardActionArea {...getLinkProps(`/blog/post/${node.meta.slug}`)}>
                            <CardHeader
                                title={node.meta.title}
                            />
                            <CardContent>
                                {node.excerpt}
                            </CardContent>
                        </CardActionArea>
                    </Suspended>
                </Card>

            ))}
        </Panel>
    )
}

export const pageQuery = graphql`
  query BlogList($filter: MdxFilterInput, $skip: Int = 0, $limit: Int = 10) {
    allMdx(
        filter: $filter
        sort: {fields: meta___date, order: DESC}
        limit: $limit
        skip: $skip
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
`
