import React from 'react'
import { Box, CssBaseline, ThemeProvider } from '@material-ui/core'
import { Helmet } from 'react-helmet'

import AppBar from './AppBar'
import Footer from './Footer'
import { ConfigProvider } from './Config'
import useTheme from './theme'
import useBackground from './background'
import { Swipeable } from '../Swipeable'
import { css } from '@emotion/react'

export default function App({
    children,
}: React.PropsWithChildren<unknown>) {
    return <div key="App">
        <Helmet>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
            />
            <link
                href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap"
                rel="stylesheet"
            />
        </Helmet>
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

    const bgSx = useBackground()

    const bodyCss = css({
        fontFamily: `'Alegreya Sans', sans-serif`,
        fontWeight: 100,
        margin: 0,
        color: theme.palette.getContrastText(theme.palette.background.default),
        minHeight: '100vh',
        ...bgSx,
    })

    return (
        <Swipeable>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <Helmet
                    bodyAttributes={{
                        class: `css-${bodyCss.name}`,
                    }}
                >
                    <style>{`.css-${bodyCss.name} { ${bodyCss.styles} }`}</style>
                </Helmet>
                <AppBar sx={bgSx}/>
                <Box component="main" sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    {children}
                </Box>
                <Footer/>
            </Box>
        </Swipeable>
    )
}
