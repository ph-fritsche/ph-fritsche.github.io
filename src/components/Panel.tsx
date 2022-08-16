import { Box, useTheme } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export default function Panel({
    columns = 1,
    children,
}: PropsWithChildren<{
    columns?: number,
}>) {
    const theme = useTheme()

    return (
        <Box sx={{
            columnCount: 1,
            [theme.breakpoints.up('sm')]: {
                columnCount: Math.min(2, columns),
            },
            [theme.breakpoints.up('md')]: {
                columnCount: Math.min(3, columns),
            },
            [theme.breakpoints.up('lg')]: {
                columnCount: Math.min(4, columns),
            },
        }}>
            {children}
        </Box>
    )
}
