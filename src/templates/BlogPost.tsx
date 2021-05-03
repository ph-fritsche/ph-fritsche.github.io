import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { Button, CardActions, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core'
import Card from '~src/components/Card'
import { getLinkProps } from '~src/components/Link'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import TwitterIcon from '~res/images/twitter'
import { getImageProps } from '~src/components/Image'

export default function BlogPost({data, location}: PageProps<GatsbyTypes.BlogPostQuery>) {
    useDarkModeSwitch()

    const classes = useStyles()

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

    return <>
        <Seo
            title={data.mdx?.meta.title}
            description={data.mdx?.meta.description}
        />
        <Card component="article">
            <CardContent>
                <Typography variant="subtitle2">{data.mdx?.meta.date && (new Date(data.mdx.meta.date)).toLocaleDateString()}</Typography>
            </CardContent>
            <CardActions>
                {data.mdx?.meta.tags.map(t => (
                    <Button
                        key={t}
                        size="small"
                        {...getLinkProps(`/blog/tag/${t}`)}
                    >
                        #{t}
                    </Button>
                ))}
            </CardActions>
            {data.mdx?.meta.image && (
                <CardMedia
                    component="img"
                    {...getImageProps(data.mdx?.meta.image ?? '')}
                    className={classes.image}
                />
            )}
            <CardHeader
                title={data.mdx?.meta.title}
                titleTypographyProps={{
                    variant: 'h1',
                    className: [classes.header, data.mdx?.meta.image ? classes.headerWithMedia : null]
                        .filter(Boolean).join(' '),
                }}
            />
            <CardContent>
                <div className={classes.content}>
                    {
                        data.mdx?.body && (
                            <MDXProvider components={mdxComponents}>
                                <MDXRenderer>{data.mdx.body}</MDXRenderer>
                            </MDXProvider>
                        )
                    }
                </div>
            </CardContent>
            <CardActions className={classes.actions}>
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

const useStyles = makeStyles(theme => {
    const headerBg = theme.palette.getContrastText(theme.palette.text.primary)
    const headerHeight = getCssValue(theme.typography.h1.fontSize ?? '2em')

    return {
        image: {
            marginBottom: `-${headerHeight.value * 1.1}${headerHeight.unit}`,
            height: `calc((100vw - 32px) * 0.5)`,
            [theme.breakpoints.down('sm')]: {
                height: `calc((100vw - 16px) * 0.5)`,
            },
            [theme.breakpoints.down('xs')]: {
                height: `calc((100vw - 8px) * 0.5)`,
            },
        },
        header: {
            color: theme.palette.primary.main,
            fontWeight: 'normal !important' as 'bold',
        },
        headerWithMedia: {
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
        },
        content: {
            paddingBottom: '1.5em !important',
        },
        actions: {
            display: 'flex',
            flexDirection: 'row-reverse',
        },
    }
})

export const pageQuery = graphql`
    query BlogPost($id: String) {
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
