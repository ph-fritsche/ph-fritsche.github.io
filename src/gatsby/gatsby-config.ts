import { colorPrimary } from '../config';
import me from '../../content/me'

const rootDir = `${__dirname}/../..`

export const siteMetadata = {
    title: `Philipp Fritsche`,
    description: `Coding`,
    author: {
        email: me.email,
        github: me.github,
        twitter: me.twitter,
    },
}

export const flags = {
    DEV_SSR: true,
    FAST_DEV: true,
}

export const plugins = [
    {
        resolve: `${rootDir}/src/gatsby/wrapper`,
    },
    {
        resolve: 'gatsby-plugin-material-ui',
        options: {
            // stylesProvider: {
            //     injectFirst: true,
            // },
        },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `resources`,
            path: `${rootDir}/resources`,
        },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `gatsby-starter-default`,
            short_name: `starter`,
            start_url: `/`,
            background_color: colorPrimary,
            theme_color: colorPrimary,
            display: `minimal-ui`,
            icon: `resources/images/chevron.svg`, // This path is relative to the root of the site.
        },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog`,
            path: `${rootDir}/content/blog/`,
        },
    },
    `gatsby-plugin-mdx`,
    {
        resolve: `gatsby-plugin-typegen`,
        options: {
            outputPath: `${rootDir}/src/typegen.d.ts`,
        },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
]
