import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from '.'

test('render content in App', async () => {
    render(<App>foo</App>)

    await waitFor(() => expect(screen.getByText('foo')).toBeInTheDocument())
})
