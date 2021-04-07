import React from 'react'
import { CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core"
import { Helmet } from 'react-helmet'

import AppBar from './AppBar'
import Footer from './Footer'
import { ConfigProvider } from './Config'
import useTheme from './theme'
import useBackground from './background'

export default function App({
    children
}: React.PropsWithChildren<{}>) {
    return (
        <ConfigProvider>
            <AppInConfig>{children}</AppInConfig>
        </ConfigProvider>
    )
}

function AppInConfig({
    children
}: React.PropsWithChildren<{}>) {
    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppInTheme>{children}</AppInTheme>
        </ThemeProvider>
    )
}

function AppInTheme({
    children
}: React.PropsWithChildren<{}>) {
    const classes = useStyles()

    const bgClass = useBackground()

    return (
        <div className={classes.app}>
            <Helmet
                link={[
                    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' },
                ]}
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
