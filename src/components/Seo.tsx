/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { getImageOg } from './Image'

export default function Seo({
    description,
    lang = 'en',
    meta = [],
    title,
    image,
    type = 'website',
}: {
    description?: string,
    lang?: string,
    meta?: {
        name: string,
        content: string,
    }[],
    title?: string,
    image?: string,
    type?: 'website' | 'article' | 'blog',
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
    const twitterHandle = site?.siteMetadata?.author?.twitter ? `@${site?.siteMetadata?.author?.twitter}` : undefined

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
                    content: title ?? site?.siteMetadata?.author?.name,
                },
                {
                    property: `og:description`,
                    content: description,
                },
                {
                    property: `og:type`,
                    content: type,
                },
                {
                    property: `og:image`,
                    content: image && getImageOg(image),
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: twitterHandle,
                },
                {
                    name: `twitter:site`,
                    content: twitterHandle,
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
