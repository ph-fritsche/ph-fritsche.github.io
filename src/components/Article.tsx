import React from 'react'
import { makeStyles, Paper } from '@material-ui/core'
import { useDarkModeSwitch } from './App/Config'

export function Article({
    children,
}: {
    children: React.ReactNode,
}) {
    const classes = useStyles()
    useDarkModeSwitch()

    return (
        <Paper className={classes.root}>
            <article>
                {children}
            </article>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: '8px',
    },
}))