import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '.'

test('render content in App', () => {
    render(<App>foo</App>)

    expect(screen.getByText('foo')).toBeInTheDocument()
})
