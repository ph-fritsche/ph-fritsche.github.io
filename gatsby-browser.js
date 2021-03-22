/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require("react")
const { App } = require("./src/components/App");
const { Page } = require("./src/components/Page/Page");

// You can delete this file if you're not using it

exports.wrapRootElement = ({ element }) => (
    <App>
        {element}
    </App>
)

exports.wrapPageElement = ({element, props}) => (
    <Page {...props}>
        {element}
    </Page>
)
