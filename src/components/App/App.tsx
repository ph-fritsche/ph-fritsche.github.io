import React from 'react'
import { AppBar, Container, CssBaseline, makeStyles, ThemeProvider } from "@material-ui/core"
import { Helmet } from 'react-helmet'

import lowPolyGrid from '../../images/low-poly-grid.svg'
import { Link } from 'gatsby'
import { theme } from '../../theme'

export function App({ children }) {
    const hue = Math.random() * 360
    const classes = useStyles({
        hue,
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Helmet
                link={[
                    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
                    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap' },
                ]}
                bodyAttributes={{
                    class: classes.root,
                }}
            />
            <AppBar position="sticky" className={classes.appBar}>
                <Container sx={{maxWidth: 800}}>
                    <Link to="/">Home</Link>
                    <span>|</span>
                    <Link to="/blog">Blog</Link>
                </Container>
            </AppBar>
            {children}
        </ThemeProvider>
    )
}

function rotateHue(hue: number, angle: number) {
    const newAngle = hue + angle
    if (newAngle > 360) {
        return newAngle - 360
    } else if (newAngle < 0) {
        return 360 - newAngle
    }
    return newAngle
}

const useStyles = makeStyles(theme => ({
    root: ({ hue }: { hue: number }) => ({
        fontFamily: `'Alegreya Sans', sans-serif`,
        fontWeight: 100,
        margin: 0,
        backgroundImage: `
            radial-gradient(
                at 35% 35%,
                hsla(${rotateHue(hue, 0)}, 100%, 30%, 10%),
                hsla(${rotateHue(hue, 0)}, 100%, 5%, 0%)
            ),
            url('${lowPolyGrid}'),
            linear-gradient(
                110deg,
                hsla(${rotateHue(hue, 300)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 300)}, 100%, 0%, 0%) 80%
            ),
            linear-gradient(
                230deg,
                hsla(${rotateHue(hue, 60)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 60)}, 100%, 0%, 0%) 80%
            ),
            linear-gradient(
                350deg,
                hsla(${rotateHue(hue, 120)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 120)}, 100%, 0%, 0%) 80%
            )
        `,
        backgroundBlendMode: 'hard-light, luminosity, normal, normal, normal',
        backgroundAttachment: 'fixed',
        backgroundSize: '100vw 100vh, cover, 100vw 100vh, 100vw 100vh, 100vw 100vh',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(`hsl(0, 10%, 0%)`),
    }),
    appBar: {
        backgroundColor: 'transparent !important',
    },
}))
