/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default function Seo({
    description = '',
    lang = 'en',
    meta = [],
    title,
}: {
  description?: string,
  lang?: string,
  meta?: {
    name: string,
    content: string,
  }[],
  title?: string,
} = {}) {
    const { site } = useStaticQuery<GatsbyTypes.SeoQuery>(graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            author {
              twitter
            }
          }
        }
      }
    `)

    const metaDescription = description || site?.siteMetadata?.description
    const defaultTitle = site?.siteMetadata?.title

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title ? `${title} | ${defaultTitle}` : defaultTitle}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site?.siteMetadata?.author?.twitter || ``,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    )
}
