import { render, screen } from '@testing-library/react'
import React from 'react'
import App from './App'

it('render', () => {
    render(<App>foo</App>)

    expect(screen.getByText('foo')).toBeInTheDocument()
})
