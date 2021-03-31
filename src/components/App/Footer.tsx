import { alpha, makeStyles } from '@material-ui/core'
import React from 'react'
import Container from './Container'

export default function Footer() {
    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <Container>
                (c) {(new Date()).getFullYear()} Philipp Fritsche
            </Container>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: 'auto',
        fontSize: '8px',
        paddingTop: '10vh',
        textAlign: 'center',
        color: alpha(theme.palette.getContrastText(theme.palette.background.default), .7),
    },
}))
