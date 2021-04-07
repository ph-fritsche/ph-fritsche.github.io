import { alpha, createMuiTheme, darken, lighten,  } from "@material-ui/core";
import { useMemo } from "react";
import { colorPrimary } from "../../config"; // ts paths don't work for the cjs module
import { useConfig } from "./Config";

export default function useTheme() {
    const [config] = useConfig()
    return useMemo(() => createTheme(config), [config])
}

function createTheme(
    config: ReturnType<typeof useConfig>[0]
) {
    const primaryOnLight = config.darkMode
        ? colorPrimary
        : darken(colorPrimary, .5)

    const themeObject: Parameters<typeof createMuiTheme>[0] = {
        palette: {
            mode: config.darkMode ? 'dark' : 'light',
            primary: {
                main: colorPrimary,
            },
            background: {
                default: alpha(dark, 1),
            },
        },
        typography: {
            fontFamily: `'Alegreya Sans', sans-serif`,
            button: {
                fontFamily: `'Roboto', sans-serif`,
            },
            body1: {
                margin: '1em',
            },
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        transition: createTransition(),
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        border: '1px solid transparent',
                        borderColor: primaryOnLight,
                    },
                },
            },
            MuiCardActions: {
                styleOverrides: {
                    root: {
                        '& > *': {
                            color: `${config.darkMode ? colorPrimary : darken(colorPrimary, .5)} !important`,
                        },
                    },
                },
            },
        },
    }

    return createMuiTheme(themeObject)
}

const dark = `hsla(0, 0%, 3%, 95%)`
const light = `hsla(0, 0%, 97%, 95%)`
const createTransition = (
    props: string[] = ['all'],
    {
        duration = '500ms',
        easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay = '0s',
    } = {}
) => props.map(p => `${p} ${duration} ${easing} ${delay}`).join(',')

