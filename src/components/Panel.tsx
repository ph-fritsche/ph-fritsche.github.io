import { makeStyles } from "@material-ui/core";
import React, { PropsWithChildren } from "react";

export default function Panel({
    columns = 1,
    children,
}: PropsWithChildren<{
    columns?: number,
}>) {
    const classes = useStyles(columns)

    return (
        <div className={classes.panel}>
            {children}
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    panel: {
        columnCount: 1,
        [theme.breakpoints.up('sm')]: {
            columnCount: (columns: number) => Math.min(2, columns),
        },
        [theme.breakpoints.up('md')]: {
            columnCount: (columns: number) => Math.min(3, columns),
        },
        [theme.breakpoints.up('lg')]: {
            columnCount: (columns: number) => Math.min(4, columns),
        },
    },
}))
