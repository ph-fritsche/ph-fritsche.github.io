import React, { useEffect, useMemo, useState } from 'react'
import { createMuiTheme, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core"
import { Helmet } from 'react-helmet'

import lowPolyGrid from '~res/images/low-poly-grid.svg'
import AppBar from './AppBar'
import Footer from './Footer'
import { SettingsProvider, useSettingsReducer } from './Settings'
import { colorBackground, colorPrimary } from '../../config'

export default function App({
    children
}: React.PropsWithChildren<{}>) {
    const settingsReducer = useSettingsReducer()

    const theme = useMemo(() => createMuiTheme({
        palette: {
            primary: {
                main: colorPrimary,
            },
            background: {
                default: colorBackground,
                paper: settingsReducer[0].nightmode ? dark : light,
            },
            text: {
                primary: settingsReducer[0].nightmode ? light : dark,
            }
        },
    }), [settingsReducer])

    console.log(theme)

    return (
        <SettingsProvider settingsReducer={settingsReducer}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ThemedApp>{children}</ThemedApp>
            </ThemeProvider>
        </SettingsProvider>
    )
}

function ThemedApp({
    children
}: React.PropsWithChildren<{}>) {
    const classes = useStyles()

    const [hue, setHue] = useState(0)
    const bgClasses = useBackgrounds()
    const bgClass = `${bgClasses.background} ${bgClasses[`background-${hue}`]}`

    useEffect(() => {
        const rotateBg = () => setHue(h => h >= 360 - backgroundsStep ? 0 : h + backgroundsStep)

        document.body.addEventListener('click', rotateBg)

        return () => document.body.removeEventListener('click', rotateBg)
    }, [])

    return (
        <div className={classes.app}>
            <Helmet
                link={[
                    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap' },
                ]}
                bodyAttributes={{
                    class: `${classes.body} ${bgClass}`,
                }}
            />
            <AppBar className={bgClass}/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

const dark = `hsl(0, 0%, 3%)`
const light = `hsl(0, 0%, 97%)`

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
}))

function rotateHue(hue: number, angle: number) {
    const newAngle = hue + angle
    if (newAngle > 360) {
        return newAngle - 360
    } else if (newAngle < 0) {
        return 360 - newAngle
    }
    return newAngle
}

function getBackgroundImage(hue: number) {
    return {
        backgroundImage: `
            radial-gradient(
                at 35% 35%,
                hsla(${rotateHue(hue, 0)}, 100%, 30%, 10%),
                hsla(${rotateHue(hue, 0)}, 100%, 5%, 0%)
            ),
            url('${lowPolyGrid}'),
            linear-gradient(
                130deg,
                hsla(${rotateHue(hue, 300)}, 100%, 7%, 100%),
                hsla(${rotateHue(hue, 300)}, 100%, 0%, 0%) 70%
            ),
            linear-gradient(
                260deg,
                hsla(${rotateHue(hue, 60)}, 100%, 7%, 100%),
                hsla(${rotateHue(hue, 60)}, 100%, 0%, 0%) 90%
            ),
            linear-gradient(
                40deg,
                hsla(${rotateHue(hue, 120)}, 100%, 7%, 100%),
                hsla(${rotateHue(hue, 120)}, 100%, 0%, 0%) 90%
            )
        `
    }
}
const backgroundsStep = 30
const backgrounds = Object.fromEntries(Array.from(Array(360/backgroundsStep).keys())
    .map(i => [`background-${i * backgroundsStep}`, getBackgroundImage(i * backgroundsStep)])
)
const useBackgrounds: () => Record<keyof typeof backgrounds, string> = makeStyles(theme => ({
    background: {
        backgroundBlendMode: 'hard-light, luminosity, normal, normal, normal',
        backgroundAttachment: 'fixed',
        backgroundSize: '100vw 100vh, cover, 100vw 100vh, 100vw 100vh, 100vw 100vh',
        backgroundColor: `${theme.palette.background.default} !important`,
    },
    ...backgrounds,
}))
