import React from 'react'
import { Card, makeStyles, Paper } from '@material-ui/core'
import { useDarkModeSwitch } from './App/Config'

export function Article({
    children,
}: {
    children: React.ReactNode,
}) {
    const classes = useStyles()
    useDarkModeSwitch()

    return (
        <Card className={classes.root} component="article">
            {children}
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '8px',
    },
}))