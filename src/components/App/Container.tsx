import React from "react";
import { Container as MuiContainer, makeStyles } from '@material-ui/core'

export default function Container({
    className,
    children,
}: React.PropsWithChildren<{
    className?: string,
}>) {
    return (
        <MuiContainer maxWidth="md" className={className}>
            {children}
        </MuiContainer>
    )
}
