import React from 'react'
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Helmet } from 'react-helmet'

import AppBar from './AppBar'
import Footer from './Footer'
import { ConfigProvider } from './Config'
import useTheme from './theme'
import { Swipeable } from '../Swipeable'
import { css } from '@emotion/react'

export default function App({
    children,
}: React.PropsWithChildren<unknown>) {
    return <div key="App">
        <ConfigProvider>
            <AppInConfig>{children}</AppInConfig>
        </ConfigProvider>
    </div>
}

function AppInConfig({
    children,
}: React.PropsWithChildren<unknown>) {
    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppInTheme>{children}</AppInTheme>
        </ThemeProvider>
    )
}

function AppInTheme({
    children,
}: React.PropsWithChildren<unknown>) {
    const theme = useTheme()

    const bodyCss = css({
        fontWeight: 100,
        color: theme.palette.getContrastText(theme.palette.background.default),
        minHeight: '100vh',
    })

    return (
        <Swipeable>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Helmet>
                    <style>{`body, .css-${bodyCss.name} { ${bodyCss.styles} }`}</style>
                </Helmet>
                <AppBar/>
                <Box component="main" sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {children}
                </Box>
                <Footer />
            </Box>
        </Swipeable>
    )
}
