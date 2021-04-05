import React from 'react'
import { alpha, makeStyles, Typography } from "@material-ui/core";
import { FormatQuote } from "@material-ui/icons";

export default function Quote({
    children,
}: React.PropsWithChildren<{}>) {
    const classes = useStyles()

    return (
        <div className={classes.quoteContainer}>
            <FormatQuote className={classes.leadingQuotes}/>
            <Typography
                component="blockquote"
                className={classes.quote}
            >
                {children}
            </Typography>
            <FormatQuote className={classes.trailingQuotes} />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    quoteContainer: {
        position: 'relative',
    },
    quote: {
    },
    leadingQuotes: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '1.2em !important',
        height: '1.2em !important',
        color: alpha(theme.palette.primary.main, .5),
    },
    trailingQuotes: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '1.2em !important',
        height: '1.2em !important',
        color: alpha(theme.palette.primary.main, .5),
    },
}))
