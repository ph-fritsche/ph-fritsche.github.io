import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { css, SerializedStyles } from '@emotion/react'
import lowPolyGrid from '~res/images/low-poly-grid.svg'
import { Helmet } from 'react-helmet'

const BackgroundContext = createContext<SerializedStyles|undefined>(undefined)

export default function BackgroundProvider({
    children,
}: PropsWithChildren<unknown>) {
    const [hue, setHue] = useState(0)

    useEffect(() => {
        const rotateBg = () => setHue(h => rotateHue(h, backgroundsStep))

        document.body.addEventListener('click', rotateBg)

        return () => document.body.removeEventListener('click', rotateBg)
    }, [setHue])

    const styles = css({
        backgroundBlendMode: 'hard-light, luminosity, normal, normal, normal',
        backgroundAttachment: 'fixed',
        backgroundSize: '100vw 100vh, cover, 100vw 100vh, 100vw 100vh, 100vw 100vh',
        backgroundColor: `hsl(0, 0%, 3%) !important`,
        ...backgrounds[hue],
    } as const)
    styles.name = `css-${styles.name}`

    return <>
        <Helmet>
            <style>{`body, .${styles.name} { ${styles.styles} }`}</style>
        </Helmet>
        <BackgroundContext.Provider value={styles}>
            {children}
        </BackgroundContext.Provider>
    </>
}

export function useBackground() {
    return useContext(BackgroundContext)
}

function rotateHue(hue: number, angle: number) {
    const newAngle = hue + angle
    if (newAngle >= 360) {
        return newAngle - 360
    } else if (newAngle < 0) {
        return 360 + newAngle
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
            !important
        `,
    } as const
}
const backgroundsStep = 30
const backgrounds = Object.fromEntries(Array.from(Array(360 / backgroundsStep).keys())
    .map(i => [i * backgroundsStep, getBackgroundImage(i * backgroundsStep)]),
)
