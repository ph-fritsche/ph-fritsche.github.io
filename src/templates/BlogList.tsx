import React from 'react'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import { CardActionArea, CardContent, CardHeader, makeStyles, Pagination } from '@material-ui/core'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import { getLinkProps } from '~src/components/Link'

export interface blogPostFrontmatter {
    title?: string
    tags?: string[],
    date?: string,
}

export default function BlogList({location, data}: PageProps<GatsbyTypes.BlogListQuery>) {
    useDarkModeSwitch()

    const classes = useStyles()

    return (
        <div>
            <Panel>
                {data.allMdx.edges.map(({ node }) => (
                    <Card key={node.meta.slug}>
                        <CardActionArea {...getLinkProps(`/blog/post/${node.meta.slug}`)}>
                            <CardHeader
                                title={node.meta.title}
                            />
                            <CardContent>
                                {node.excerpt}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Panel>
            { data.allMdx.pageInfo.pageCount > 0 && (
                <div className={classes.paginationContainer}>
                    <Pagination
                        variant="outlined"
                        color="primary"
                        className={classes.pagination}
                        count={data.allMdx.pageInfo.pageCount}
                        page={data.allMdx.pageInfo.currentPage}
                        onChange={(e, i) => {
                            const path = location.pathname.split('/').filter(f => f && !f.match(/page\d+/))
                            navigate('/' + path.concat(i > 1 ? [`page${i}`] : []).join('/'))
                        }}
                    />
                </div>
            )}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '8px',
    },
    pagination: {
        '& button': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}))

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
