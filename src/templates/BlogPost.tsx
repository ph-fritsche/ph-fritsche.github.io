import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { Button, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core'
import Card from '~src/components/Card'
import { getLinkProps } from '~src/components/Link'

export default function BlogPost({data}: PageProps<GatsbyTypes.BlogPostQuery>) {
    useDarkModeSwitch()

    return (
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
        </Card>
    )
}

export const pageQuery = graphql`
    query BlogPost($id: String) {
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
