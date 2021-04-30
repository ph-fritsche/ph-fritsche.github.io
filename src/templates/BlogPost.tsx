import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, navigate, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { Button, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core'
import Card from '~src/components/Card'
import { getLinkProps } from '~src/components/Link'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import TwitterIcon from '~res/images/twitter'

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
        <Seo title={data.mdx?.meta.title}/>
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
            <CardHeader
                title={data.mdx?.meta.title}
                titleTypographyProps={{variant: 'h1'}}
            />
            <CardContent>
                {
                    data.mdx?.body && (
                        <MDXProvider components={mdxComponents}>
                            <MDXRenderer>{data.mdx.body}</MDXRenderer>
                        </MDXProvider>
                    )
                }
            </CardContent>
            <CardActions className={classes.actions}>
                <Button
                    {...getLinkProps(String(twitterShare))}
                    startIcon={<TwitterIcon/>}
                >
                    Share
                </Button>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </CardActions>
        </Card>
    </>
}

const useStyles = makeStyles({
    actions: {
        display: 'flex',
        flexDirection: 'row-reverse',
    },
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
            }
        }
    }
`
