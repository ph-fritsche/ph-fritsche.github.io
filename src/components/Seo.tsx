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
    description,
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
            author {
              name
              twitter
            }
          }
        }
      }
    `)

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={[title, site?.siteMetadata?.author?.name].filter(Boolean).join(' | ')}
            meta={[
                {
                    name: `description`,
                    content: description,
                },
                {
                    property: `og:site_name`,
                    content: site?.siteMetadata?.author?.name,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: description,
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
                    content: description,
                },
            ].concat(meta)}
        />
    )
}
