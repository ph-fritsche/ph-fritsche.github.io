import React from 'react'
import { Card } from '@mui/material'
import { useDarkModeSwitch } from './App/Config'

export function Article({
    children,
}: React.PropsWithChildren<unknown>) {
    useDarkModeSwitch()

    return (
        <Card
            component="article"
            sx={{
                padding: '8px',
            }}
        >
            {children}
        </Card>
    )
}
