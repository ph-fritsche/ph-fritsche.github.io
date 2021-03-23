import React, { useEffect, useState } from 'react'
import { AppBar, Container, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core"
import { Helmet } from 'react-helmet'

import lowPolyGrid from '../../../resources/images/low-poly-grid.svg'
import { Link } from 'gatsby'
import { theme } from '../../theme'

export function App({
    children
}: {
    children: React.ReactChildren,
}) {
    const classes = useStyles()
    const bgClasses = useBackgrounds()
    const [hue, setHue] = useState(0)

    useEffect(() => {
        const rotateBg = () => setHue(h => h >= 360 - backgroundsStep ? 0 : h + backgroundsStep)

        document.body.addEventListener('click', rotateBg)

        return () => document.body.removeEventListener('click', rotateBg)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Helmet
                link={[
                    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap' },
                ]}
                bodyAttributes={{
                    class: [classes.body, bgClasses[`background-${hue}`]].join(' '),
                }}
            />
            <div>
                <AppBar position="sticky" className={classes.appBar}>
                    <Container sx={{maxWidth: 800}}>
                        <Link to="/">Home</Link>
                        <span>|</span>
                        <Link to="/blog">Blog</Link>
                    </Container>
                </AppBar>
                {children}
            </div>
        </ThemeProvider>
    )
}

const useStyles = makeStyles(theme => ({
    body: {
        fontFamily: `'Alegreya Sans', sans-serif`,
        fontWeight: 100,
        margin: 0,
        backgroundBlendMode: 'hard-light, luminosity, normal, normal, normal',
        backgroundAttachment: 'fixed',
        backgroundSize: '100vw 100vh, cover, 100vw 100vh, 100vw 100vh, 100vw 100vh',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(`hsl(0, 10%, 0%)`),
        minHeight: '100vh',
    },
    ...backgrounds,
    appBar: {
        backgroundColor: 'transparent !important',
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
const useBackgrounds: () => Record<keyof typeof backgrounds, string> = makeStyles(backgrounds)
