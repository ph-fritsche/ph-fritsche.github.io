import { alpha, makeStyles } from '@material-ui/core'
import React from 'react'
import Container from './Container'

export default function Footer() {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Container>
                <div aria-hidden="true">
                    (c) {(new Date()).getFullYear()} Philipp Fritsche
                </div>
            </Container>
        </footer>
    )
}

const useStyles = makeStyles(theme => ({
    footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 'auto',
        fontSize: '8px',
        minHeight: '5vh',
        textAlign: 'center',
        color: alpha(theme.palette.getContrastText(theme.palette.background.default), .7),
    },
}))
