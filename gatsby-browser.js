/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require("react")
const App = require("./src/components/App").default;
const Page = require("./src/components/Page").default;

export const wrapRootElement = ({ element }) => (
    <App>
        {element}
    </App>
)

export const wrapPageElement = ({element, props}) => (
    <Page {...props}>
        {element}
    </Page>
)
