import React from 'react'
import { CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core'
import { Helmet } from 'react-helmet'

import AppBar from './AppBar'
import Footer from './Footer'
import { ConfigProvider } from './Config'
import useTheme from './theme'
import useBackground from './background'
import { Swipeable } from '../Swipeable'

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
    const classes = useStyles()

    const bgClass = useBackground()

    return (
        <Swipeable>
            <div className={classes.app}>
                <Helmet
                    bodyAttributes={{
                        class: `${classes.body} ${bgClass}`,
                    }}
                />
                <AppBar className={bgClass}/>
                <main className={classes.content}>
                    {children}
                </main>
                <Footer/>
            </div>
        </Swipeable>
    )
}

const useStyles = makeStyles(theme => ({
    body: {
        fontFamily: `'Alegreya Sans', sans-serif`,
        fontWeight: 100,
        margin: 0,
        color: theme.palette.getContrastText(theme.palette.background.default),
        minHeight: '100vh',
    },
    app: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}))
