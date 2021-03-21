import React from 'react'
import { alpha, makeStyles, Paper } from '@material-ui/core'

export function Article({children}) {
    const classes = useStyles()

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
        backgroundColor: alpha(theme.palette.background.default, .95),
    }
}))