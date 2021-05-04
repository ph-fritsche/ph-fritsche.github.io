import React from 'react'
import { alpha, makeStyles, Typography } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

export default function Quote({
    bg,
    children,
}: React.PropsWithChildren<{
    bg?: 'light' | 'dark',
}>) {
    const classes = useStyles({bg})

    return (
        <div className={classes.quoteContainer}>
            <FormatQuote className={`${classes.icon} ${classes.leadingQuotes}`} />
            <blockquote className={classes.quote}>
                { typeof children === 'string'
                    ? <Typography>{children}</Typography>
                    : children
                }
            </blockquote>
            <FormatQuote className={`${classes.icon} ${classes.trailingQuotes}`} />
        </div>
    )
}

const modeOpposite = {
    light: 'dark',
    dark: 'light',
} as const
const useStyles = makeStyles(theme => ({
    quoteContainer: {
        position: 'relative',
        padding: '1px 0', // prevent collapsing margins
    },
    quote: {
        margin: '.7em 0',
        padding: '4px 1em',
        backgroundColor: ({bg}: {bg?: 'light' | 'dark'}) =>
            (bg ?? theme.palette.mode) === 'light' ? `hsla(0, 0%, 0%, 7%)` : `hsla(0, 0%, 100%, 7%)`,
        borderRadius: '4px',
    },
    icon: {
        width: '1.2em !important',
        height: '1.2em !important',
        color: ({bg}: {bg?: 'light' | 'dark'}) => alpha(theme.palette.primary[modeOpposite[bg ?? theme.palette.mode]], .5),
    },
    leadingQuotes: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    trailingQuotes: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}))
