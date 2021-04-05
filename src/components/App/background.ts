import { makeStyles } from "@material-ui/core"
import { useEffect, useState } from "react"
import lowPolyGrid from '~res/images/low-poly-grid.svg'

export default function useBackground() {
    const bgClasses = useBackgroundClasses()
    
    const [hue, setHue] = useState(0)
    const bgClassName = `${bgClasses.background} ${bgClasses[`background-${hue}`]}`

    useEffect(() => {
        const rotateBg = () => setHue(h => rotateHue(h, backgroundsStep))

        document.body.addEventListener('click', rotateBg)

        return () => document.body.removeEventListener('click', rotateBg)
    }, [setHue, rotateHue])

    return bgClassName
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
        `
    }
}
const backgroundsStep = 30
const backgrounds = Object.fromEntries(Array.from(Array(360 / backgroundsStep).keys())
    .map(i => [`background-${i * backgroundsStep}`, getBackgroundImage(i * backgroundsStep)])
)
const useBackgroundClasses: () => Record<keyof typeof backgrounds, string> = makeStyles(theme => ({
    background: {
        backgroundBlendMode: 'hard-light, luminosity, normal, normal, normal',
        backgroundAttachment: 'fixed',
        backgroundSize: '100vw 100vh, cover, 100vw 100vh, 100vw 100vh, 100vw 100vh',
        backgroundColor: `${theme.palette.background.default} !important`,
    },
    ...backgrounds,
}))
