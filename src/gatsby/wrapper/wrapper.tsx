import type { WrapPageElementBrowserArgs, WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby'
import React from 'react'
import Container from '~src/components/App/Container'
import App from '../../components/App'

export const wrapRootElement = ({
    element,
}: WrapRootElementNodeArgs | WrapRootElementNodeArgs) => (
    // Wrapping the tree in a non-div element seems to be necessary for correct React hydration.
    // The ancestors of this root element produced in SSR seems to differ from the one produced in the browser.
    // <div id="gatsby-focus-wrapper"> replaces the upmost div returned.
    // This leads to attributes like classes slipping out of position to a different element.
    <span style={{display: 'block'}}>
        <App>
            {element}
        </App>
    </span>
)

export const wrapPageElement = ({
    element,
}: WrapPageElementBrowserArgs | WrapPageElementNodeArgs) => (
    <Container>
        {element}
    </Container>
)
