import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import AppWrapper from '.'
import App from './App'

jest.mock('./App', () => ({
    __esModule: true,
    default: function AppMock({children}: ComponentProps<typeof App>) {
        return <>{children}</>
    },
}))

test('render content in App', async () => {
    render(<AppWrapper>foo</AppWrapper>)

    expect(await screen.findByText('foo')).toBeInTheDocument()
})
