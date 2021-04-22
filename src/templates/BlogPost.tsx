import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import { useDarkModeSwitch } from '~src/components/App/Config'
import * as mdxComponents from './mdxComponents'
import { CardContent, CardHeader } from '@material-ui/core'
import Card from '~src/components/Card'

export interface blogPostFrontmatter {
  title?: string
  tags?: string[],
  date?: string,
}

export default function BlogPost({mdx}: GatsbyTypes.BlogPostQuery) {
    useDarkModeSwitch()

    return (
      <Card component="article">
        <CardHeader
          title={mdx?.frontmatter?.title}
          titleTypographyProps={{variant: 'h1'}}
          subheader={mdx?.frontmatter?.date && (new Date(mdx.frontmatter.date)).toLocaleDateString()}
        />
        <CardContent>
          <MDXProvider components={mdxComponents}>
              <MDXRenderer>{mdx?.body ?? ""}</MDXRenderer>
          </MDXProvider>
        </CardContent>
      </Card>
    )
}

export const pageQuery = graphql`
  query BlogPost($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`
