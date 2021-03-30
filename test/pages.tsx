import React from 'react'
import fs from 'fs'
import { render } from '@testing-library/react'
import { wrapPageElement as PageWrapper, wrapRootElement as RootWrapper } from '../gatsby-browser'

const pages = fs.readdirSync(`${__dirname}/../src/pages`)

test.each(pages)('render page', (pageModuleName) => {
    const pageModule = require(`${__dirname}/../src/pages/${pageModuleName}`)
    const Component = pageModule.default ?? pageModule

    render(<RootWrapper element={<PageWrapper element={<Component/>} props={{}}/>}/>)
})
