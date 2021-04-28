import React from 'react'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import { Button, CardActionArea, CardContent, CardHeader, makeStyles, Pagination, Typography } from '@material-ui/core'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import { getLinkProps } from '~src/components/Link'
import type { BaseCSSProperties } from '@material-ui/styles'

export default function BlogList({
    location,
    pageContext,
    data: {tags, list},
}: PageProps<
    GatsbyTypes.BlogListQuery,
    {
        filter: GatsbyTypes.MdxFilterInput
    }
>) {
    useDarkModeSwitch()

    const classes = useStyles()

    const tag = pageContext.filter.meta?.tags?.eq

    return (
        <div>
            { tag
                ? (
                    <Typography
                        variant="h2"
                        className={`${classes.header} ${classes.primaryOnBackground}`}
                    >
                        #{tag}
                    </Typography>
                )
                : null && <div className={classes.tags}>{
                    tags.group.map(g => (
                        <Button
                            key={g.fieldValue}
                            size="small"
                            onClick={() => {
                                navigate(`/blog/tag/${g.fieldValue}`)
                            }}
                        >
                            #{g.fieldValue}
                        </Button>
                    ))
                }</div>
            }
            <Panel>
                {list.edges.map(({ node }) => (
                    <Card
                        key={node.meta.slug}
                        className={classes.card}
                    >
                        <CardActionArea
                            {...getLinkProps(`/blog/post/${node.meta.slug}`)}
                            className={classes.cardActionArea}
                        />
                        <CardHeader
                            title={node.meta.title}
                        />
                        <CardContent>
                            <div>
                                {node.meta.tags.map(t => (
                                    <Button
                                        key={t}
                                        size="small"
                                        color="primary"
                                        onClickCapture={(e) => {
                                            navigate(`/blog/tag/${t}`)
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        href={`/blog/tag/${t}`}
                                        tabIndex="-1"
                                    >
                                        #{t}
                                    </Button>
                                ))}
                            </div>
                            {node.excerpt}
                        </CardContent>
                    </Card>
                ))}
            </Panel>
            { list.pageInfo.pageCount > 0 && (
                <div className={classes.paginationContainer}>
                    <Pagination
                        variant="outlined"
                        color="primary"
                        className={classes.pagination}
                        count={list.pageInfo.pageCount}
                        page={list.pageInfo.currentPage}
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
    primaryOnBackground: {
        color: theme.palette.primary.light,
    },
    header: {
        marginBottom: '8px !important',
    },
    tags: {
        marginBottom: '8px',
        '& button': {
            color: `${theme.palette.primary.light} !important`,
        },
    },
    card: {
        position: 'relative',
    },
    cardActionArea: {
        position: 'absolute !important' as BaseCSSProperties['position'],
        height: '100%',
        width: '100%',
    },
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
    tags: allMdx {
        group(field: meta___tags) {
            fieldValue
        }
    }
    list: allMdx(
        filter: $filter
        sort: {fields: meta___date, order: DESC}
        limit: $limit
        skip: $skip
    ) {
        pageInfo {
            currentPage
            pageCount
        }
        edges {
            node {
                meta {
                    title
                    slug
                    tags
                }
                excerpt(pruneLength: 180)
            }
        }
    }
  }
`
