import React from 'react'
import fs from 'fs'
import { render } from '@testing-library/react'
import { wrapPageElement as PageWrapper, wrapRootElement as RootWrapper } from '../src/gatsby/wrapper/wrapper'
import { WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby'

const pages = fs.readdirSync(`${__dirname}/../src/pages`)

test.each(pages)('render page', async (pageModuleName) => {
    const pageModule = await import(`${__dirname}/../src/pages/${pageModuleName}`)
    const Component = pageModule.default ?? pageModule

    render(<RootWrapper {...{
        element: <PageWrapper {...{
            element: <Component/>,
            props: {},
        } as WrapPageElementNodeArgs}/>,
    } as WrapRootElementNodeArgs}/>)
})
