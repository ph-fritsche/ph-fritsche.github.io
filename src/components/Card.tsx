import React, { ComponentPropsWithoutRef } from 'react';
import { Card as MuiCard, makeStyles } from '@material-ui/core'

export default function Card({
    component: Component = 'div',
    children,
    ...otherProps
}: ComponentPropsWithoutRef<typeof MuiCard> & {
    component?: React.ElementType
}) {
    const classes = useStyles({Component})

    return (
        <Component className={classes.cardContainer}>
            <MuiCard
                {...otherProps}
                classes={{
                    ...otherProps.classes,
                    root: [otherProps.classes?.root, classes.card].filter(Boolean).join(' '),
                }}
            >
                {children}
            </MuiCard>
        </Component>
    )
}

const useStyles = makeStyles({
    cardContainer: {
        paddingTop: '8px',
        paddingBottom: '8px',
        breakInside: ({Component}: {Component: React.ElementType}) => Component !== 'article' ? 'avoid' : 'avoid',
    },
    card: {
        '& > MuiCardActionArea-root, > MuiCardActionArea-root > *': {
            paddingTop: '0 !important',
            paddingBottom: '0 !important',
            marginTop: '8px',
            marginBottom: '8px',
        },
    },
})
