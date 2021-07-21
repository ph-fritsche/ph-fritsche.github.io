import React, { ComponentProps } from 'react';
import { Container as MuiContainer } from '@material-ui/core'

export default function Container({
    sx,
    children,
}: React.PropsWithChildren<{
    sx?: ComponentProps<typeof MuiContainer>['sx'],
}>) {
    return (
        <MuiContainer
            maxWidth="md"
            sx={{
                ...sx,
                overflow: 'hidden',
            }}
        >
            {children}
        </MuiContainer>
    )
}
