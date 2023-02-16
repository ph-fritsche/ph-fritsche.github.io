import React from 'react'
import fs from 'fs'
import { render, waitFor } from '@testing-library/react'
import { wrapPageElement as PageWrapper, wrapRootElement as RootWrapper } from '../src/gatsby/wrapper/wrapper'
import { WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby'

const pagesDir = `${__dirname}/../src/pages`
const pages = fs.readdirSync(pagesDir)

test.each(pages)('render page', async (pageModuleName) => {
    const pageModule = await import(`${pagesDir}/${pageModuleName}`) as {default: React.ElementType}
    const Component = pageModule.default
    render(<RootWrapper {...{
        element: <PageWrapper {...{
            element: <Component/>,
            props: {},
        } as WrapPageElementNodeArgs}/>,
    } as WrapRootElementNodeArgs}/>)

    // just wait for the React.Suspense
    await waitFor(() => Promise.resolve())

    expect(true).toBe(true)
})
