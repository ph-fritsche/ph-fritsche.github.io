import React, { ComponentPropsWithoutRef } from 'react';
import { Box, Card as MuiCard } from '@mui/material'

export default function Card({
    component = 'div',
    children,
    ...otherProps
}: ComponentPropsWithoutRef<typeof MuiCard> & {
    component?: React.ElementType
}) {
    return (
        <Box component={component} sx={{
            paddingTop: '8px',
            paddingBottom: '8px',
            breakInside: 'avoid',
        }}>
            <MuiCard
                {...otherProps}
                sx={{
                    ...otherProps.sx,
                    '& > MuiCardActionArea-root, > MuiCardActionArea-root > *': {
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                        marginTop: '8px',
                        marginBottom: '8px',
                    },
                }}
            >
                {children}
            </MuiCard>
        </Box>
    )
}
