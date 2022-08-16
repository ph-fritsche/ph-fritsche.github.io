import React from 'react'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import { Box, Button, CardActionArea, CardContent, CardHeader, Pagination, Typography, useTheme } from '@mui/material'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import { getLinkProps } from '~src/components/Link'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'

export default function BlogList({
    data: {tags, list},
    pageContext,
}: PageProps<
    GatsbyTypes.BlogListQuery,
    {
        filter: GatsbyTypes.MdxFilterInput
    }
>) {
    useDarkModeSwitch()

    const theme = useTheme()

    const tag = pageContext.filter.meta?.tags?.eq
    const tagsNames = [undefined, ...tags.edges.map(e => e.node.path.match(/[^/]+$/)?.[0])]
    const tagsIndex = tagsNames.indexOf(tag)

    function makeBlogPath(tag?: string, page?: number) {
        return `/blog${tag ? `/tag/${tag}`: ''}${page && page > 1 ? `/page${page}` : ''}`
    }

    useSwipeable({
        right: () => navigate(tagsIndex > 0 ? makeBlogPath(tagsNames[tagsIndex - 1], 0) : '/projects'),
        left: tagsIndex < tagsNames.length -1
            ? () => navigate(makeBlogPath(tagsNames[tagsIndex + 1]))
            : undefined,
        down: list.pageInfo.currentPage > 1
            ? () => navigate(makeBlogPath(tag, list.pageInfo.currentPage - 1))
            : undefined,
        up: list.pageInfo.pageCount > list.pageInfo.currentPage
            ? () => navigate(makeBlogPath(tag, list.pageInfo.currentPage + 1))
            : undefined,
    }, [tag, tagsIndex])

    return <>
        <Seo
            title={tag ? `#${tag}` : `Blog`}
            type="blog"
        />
        <div>
            {(tag
                ? (
                    <Typography variant="h2" sx={{
                        marginBottom: '8px !important',
                        color: theme.palette.primary.light,
                    }}>
                        #{tag}
                    </Typography>
                )
                : null
            ) && (
                <Box sx={{
                    marginBottom: '8px',
                    '& button': {
                        color: `${theme.palette.primary.light} !important`,
                    },
                }}>
                    {tagsNames.filter(Boolean).map(t => (
                        <Button
                            key={t}
                            size="small"
                            onClick={() => {
                                navigate(`/blog/tag/${t}`)
                            }}
                        >
                            #{t}
                        </Button>
                    ))}
                </Box>
            )}
            <Panel>
                {list.edges.map(({ node }) => (
                    <Card key={node.meta.slug} sx={{
                        position: 'relative',
                    }}>
                        <CardActionArea
                            {...getLinkProps(`/blog/post/${node.meta.slug}`)}
                            sx={{
                                position: 'absolute',
                                height: '100%',
                                width: '100%',
                            }}
                        />
                        <CardHeader
                            title={node.meta.title}
                        />
                        <CardContent>
                            {node.meta.tags.filter(t => t !== tag).map(t => (
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
                        </CardContent>
                        <CardContent>
                            {node.meta.description || node.excerpt}
                        </CardContent>
                    </Card>
                ))}
            </Panel>
            { list.pageInfo.pageCount > 0 && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '8px',
                }}>
                    <Pagination
                        variant="outlined"
                        color="primary"
                        count={list.pageInfo.pageCount}
                        page={list.pageInfo.currentPage}
                        onChange={(e, i) => navigate(makeBlogPath(tag, i))}
                        sx={{
                            '& button': {
                                backgroundColor: theme.palette.background.paper,
                            },
                        }}
                    />
                </Box>
            )}
        </div>
    </>
}

export const pageQuery = graphql`
  query BlogList($filter: MdxFilterInput, $skip: Int = 0, $limit: Int = 10) {
    tags: allSitePage(filter: {path: {regex: "//blog/tag/\\w+$/"}}) {
        edges {
            node {
                path
            }
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
                    description
                }
                excerpt(pruneLength: 180)
            }
        }
    }
  }
`
