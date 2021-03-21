import React from 'react'
import { Container, makeStyles } from "@material-ui/core"
import { Helmet } from 'react-helmet'

export function Page({children}) {
    const hue = Math.random() * 360
    const classes = useStyles({
        hue,
    })

    return <>
        <Helmet
            link={[
                {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
                {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alegreya+Sans&display=swap'},
            ]}
            bodyAttributes={{
                class: classes.root,
            }}
        />
        <Container sx={{maxWidth: 800}}>
            {children}
        </Container>
    </>
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
    root: ({hue}: {hue: number}) => ({
        fontFamily: `'Alegreya Sans', sans-serif`,
        fontWeight: 100,
        margin: 0,
        backgroundImage: `
            radial-gradient(
                at 35% 35%,
                hsla(${rotateHue(hue, 0)}, 100%, 30%, 10%),
                hsla(${rotateHue(hue, 0)}, 100%, 5%, 0%)
            ),
            linear-gradient(
                110deg,
                hsla(${rotateHue(hue, 300)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 300)}, 100%, 0%, 0%)
            ),
            linear-gradient(
                230deg,
                hsla(${rotateHue(hue, 60)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 60)}, 100%, 0%, 0%)
            ),
            linear-gradient(
                350deg,
                hsla(${rotateHue(hue, 120)}, 100%, 10%, 100%),
                hsla(${rotateHue(hue, 120)}, 100%, 0%, 0%)
            )
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundColor: 'black',
        color: theme.palette.getContrastText(`hsl(0, 10%, 0%)`),
    }),
}))
