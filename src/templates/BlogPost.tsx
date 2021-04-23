import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql, PageProps } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { CardContent, CardHeader } from '@material-ui/core'
import Card from '~src/components/Card'

export default function BlogPost({data}: PageProps<GatsbyTypes.BlogPostQuery>) {
    useDarkModeSwitch()

    return (
        <Card component="article">
            <CardHeader
                title={data.mdx?.meta.title}
                titleTypographyProps={{variant: 'h1'}}
                subheader={data.mdx?.meta.date && (new Date(data.mdx.meta.date)).toLocaleDateString()}
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
            }
        }
    }
`
