import React from "react";
import { Container as MuiContainer, makeStyles } from '@material-ui/core'

export default function Container({
    className,
    children,
}: React.PropsWithChildren<{
    className?: string,
}>) {
    const classes = useStyles()

    return (
        <MuiContainer
            maxWidth="md"
            className={`${classes.root} ${className}`}
        >
            {children}
        </MuiContainer>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
    },
}))
