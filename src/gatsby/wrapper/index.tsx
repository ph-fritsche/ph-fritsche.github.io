import type { WrapPageElementBrowserArgs, WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby'
import React from 'react'
import App from '../../components/App'
import Page from '../../components/Page'

export const wrapRootElement = ({
    element,
}: WrapRootElementNodeArgs | WrapRootElementNodeArgs) => (
    <App>
        {element}
    </App>
)

export const wrapPageElement = ({
    element,
    props,
}: WrapPageElementBrowserArgs | WrapPageElementNodeArgs) => (
    <Page {...props}>
        {element}
    </Page>
)
