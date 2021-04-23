import React from 'react'
import { Card, makeStyles } from '@material-ui/core'
import { useDarkModeSwitch } from './App/Config'

export function Article({
    children,
}: React.PropsWithChildren<unknown>) {
    const classes = useStyles()
    useDarkModeSwitch()

    return (
        <Card className={classes.root} component="article">
            {children}
        </Card>
    )
}

const useStyles = makeStyles(({
    root: {
        padding: '8px',
    },
}))
