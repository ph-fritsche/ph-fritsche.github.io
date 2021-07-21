import React from 'react'
import { alpha, Box, Typography, useTheme } from '@material-ui/core';
import { FormatQuote } from '@material-ui/icons';

const modeOpposite = {
    light: 'dark',
    dark: 'light',
} as const

export default function Quote({
    bg,
    children,
}: React.PropsWithChildren<{
    bg?: 'light' | 'dark',
}>) {
    const theme = useTheme()

    return (
        <Box sx={{
            position: 'relative',
            padding: '1px 0', // prevent collapsing margins
        }}>
            <FormatQuote sx={{
                width: '1.2em !important',
                height: '1.2em !important',
                color: alpha(theme.palette.primary[modeOpposite[bg ?? theme.palette.mode]], .5),
                position: 'absolute',
                bottom: 0,
                left: 0,
            }}/>
            <Box component="blockquote" sx={{
                margin: '.7em 0',
                padding: '4px 1em',
                backgroundColor: (bg ?? theme.palette.mode) === 'light' ? `hsla(0, 0%, 0%, 7%)` : `hsla(0, 0%, 100%, 7%)`,
                borderRadius: '4px',
            }}>
                { typeof children === 'string'
                    ? <Typography>{children}</Typography>
                    : children
                }
            </Box>
            <FormatQuote sx={{
                width: '1.2em !important',
                height: '1.2em !important',
                color: alpha(theme.palette.primary[modeOpposite[bg ?? theme.palette.mode]], .5),
                position: 'absolute',
                top: 0,
                right: 0,
            }}/>
        </Box>
    )
}
