import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { Box, Button, CardActions, CardContent, CardHeader, CardMedia, Typography, useTheme } from '@material-ui/core'
import Card from '~src/components/Card'
import { getLinkProps } from '~src/components/Link'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import TwitterIcon from '~res/images/twitter'
import { getImageProps } from '~src/components/Image'

export default function BlogPost({data, location}: PageProps<GatsbyTypes.BlogPostQuery>) {
    useDarkModeSwitch()

    const theme = useTheme()

    useSwipeable({
        up: () => navigate('/blog'),
        down: () => navigate('/blog'),
    }, [location.pathname])

    const twitterShare = new URL(`https://twitter.com/intent/tweet?${
        Object.entries({
            url: location.href,
            hashtags: data.mdx?.meta.tags.join(','),
            via: data.site?.siteMetadata?.author?.twitter,
        })
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
            .join('&')
    }`)

    const dateStr = data.mdx?.meta.date && (new Date(data.mdx.meta.date)).toLocaleDateString()
    const isDraft = !data.mdx?.meta.date || (new Date(data.mdx?.meta.date) > new Date())

    const tagsNames = data.tags.edges.map(e => e.node.path.match(/[^/]+$/)?.[0])

    const headerBg = theme.palette.getContrastText(theme.palette.text.primary)
    const headerHeight = getCssValue(theme.typography.h1.fontSize ?? '2em')

    return <>
        <Seo
            title={data.mdx?.meta.title}
            description={data.mdx?.meta.description}
            image={data.mdx?.meta.image}
            type="article"
        />
        <Card component="article">
            <CardContent>
                <Typography
                    variant="subtitle2"
                    sx={isDraft
                        ? {
                            color: theme.palette.warning.main,
                            '& span': {
                                margin: '2em',
                            },
                        }
                        : undefined
                    }
                >
                    {dateStr}
                    {isDraft && <span>DRAFT</span>}
                </Typography>
            </CardContent>
            <CardActions>
                {data.mdx?.meta.tags.map(t => (
                    <Button
                        key={t}
                        size="small"
                        {...getLinkProps(`/blog/tag/${t}`)}
                        disabled={!tagsNames.includes(t)}
                    >
                        #{t}
                    </Button>
                ))}
            </CardActions>
            {data.mdx?.meta.image && (
                <CardMedia
                    component="img"
                    {...getImageProps(data.mdx?.meta.image ?? '')}
                    sx={{
                        marginBottom: `-${headerHeight.value * 1.1}${headerHeight.unit}`,
                        maxHeight: '400px',
                        height: `calc((100vw - 32px) * 0.5)`,
                        [theme.breakpoints.down('sm')]: {
                            height: `calc((100vw - 16px) * 0.5)`,
                        },
                        [theme.breakpoints.down('xs')]: {
                            height: `calc((100vw - 8px) * 0.5)`,
                        },
                    }}
                />
            )}
            <CardHeader
                title={data.mdx?.meta.title}
                titleTypographyProps={{
                    variant: 'h1',
                    sx: {
                        color: theme.palette.primary.main,
                        fontWeight: 'normal',
                        ...(data.mdx?.meta.image && {
                            textShadow: [
                                `0px -2px 2px ${headerBg}`,
                                `0px 2px 2px ${headerBg}`,
                                `2px 2px 2px ${headerBg}`,
                                `2px 0px 2px ${headerBg}`,
                                `2px -2px 2px ${headerBg}`,
                                `-2px 2px 2px ${headerBg}`,
                                `-2px 0px 2px ${headerBg}`,
                                `-2px -2px 2px ${headerBg}`,
                            ].join(','),
                        }),
                    },
                }}
            />
            <CardContent>
                <Box sx={{
                    paddingBottom: '1.5em !important',
                    paddingTop: '1.5em !important',
                }}>
                    {
                        data.mdx?.body && (
                            <MDXProvider components={mdxComponents}>
                                <MDXRenderer>{data.mdx.body}</MDXRenderer>
                            </MDXProvider>
                        )
                    }
                </Box>
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
            }}>
                <Button
                    {...getLinkProps(String(twitterShare))}
                    startIcon={<TwitterIcon/>}
                >
                    Share
                </Button>
            </CardActions>
        </Card>
    </>
}

function getCssValue(value: string | number) {
    if (typeof value === 'number') {
        return {value, unit: null}
    }
    const m = value.match(/^(?<value>-?[\d.]+)(?<unit>\w*)$/)
    return {
        value: Number(m?.groups?.value),
        unit: m?.groups?.unit ?? null,
    }
}

export const pageQuery = graphql`
    query BlogPost($id: String) {
        tags: allSitePage(filter: {path: {regex: "//blog/tag/\\w+$/"}}) {
            edges {
                node {
                    path
                }
            }
        }
        site {
          siteMetadata {
            author {
                twitter
            }
          }
        }
        mdx(id: { eq: $id }) {
            body
            meta {
                title
                date
                tags
                description
                image
            }
        }
    }
`
