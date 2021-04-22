/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import { GatsbyBrowser } from "gatsby";

const React = require("react")
const App = require("../components/App").default;
const Page = require("../components/Page").default;

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
