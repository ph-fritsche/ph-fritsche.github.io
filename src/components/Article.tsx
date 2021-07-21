import React from 'react'
import { Card } from '@material-ui/core'
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
