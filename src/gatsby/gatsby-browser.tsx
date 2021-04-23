/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from 'react'
import { GatsbyBrowser } from 'gatsby'
import App from '../components/App'
import Page from '../components/Page'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({ element }) => (
    <App>
        {element}
    </App>
)

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({element, props}) => (
    <Page {...props}>
        {element}
    </Page>
)
