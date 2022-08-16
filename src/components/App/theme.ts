import { createTheme as createMuiTheme, darken, Theme, useTheme as useThemeContext } from '@mui/material';
import { useMemo } from 'react';
import { colorPrimary } from '../../config'; // ts paths don't work for the cjs module
import { useConfig } from './Config';

export default function useTheme() {
    const [config] = useConfig().settings
    const theme = useThemeContext()
    return useMemo(() => createTheme(config, theme), [config, theme])
}

function createTheme(
    config: ReturnType<typeof useConfig>['settings'][0],
    theme: Theme,
) {
    const colorPrimaryDark = darken(colorPrimary, .6)

    const { breakpoints } = theme
    breakpoints.values.xs = 400
    breakpoints.values.sm = 600
    breakpoints.values.md = 960
    breakpoints.values.lg = 1280
    breakpoints.values.xl = 1920

    const themeObject: Parameters<typeof createMuiTheme>[0] = {
        breakpoints,
        palette: {
            mode: config.darkMode ? 'dark' : 'light',
            primary: {
                main: config.darkMode ? colorPrimary : colorPrimaryDark,
                light: colorPrimary,
                dark: colorPrimaryDark,
            },
            background: {
                default: `hsl(0, 0%, 3%)`,
            },
        },
        typography: {
            fontFamily: `'Alegreya Sans', sans-serif`,
            button: {
                fontFamily: `'Roboto', sans-serif`,
            },
            h1: {
                fontSize: '3rem',
            },
            h2: {
                fontSize: '2.5rem',
            },
            h3: {
                fontSize: '1.5rem',
            },
            body1: {
                marginTop: '.5em',
                marginBottom: '.5em',
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
                        borderColor: config.darkMode ? colorPrimary : colorPrimaryDark,
                    },
                },
            },
            MuiCardActionArea: {
                styleOverrides: {
                    root: {
                        border: '1px solid transparent !important', // this stretches the element by the children's margins
                    },
                },
            },
            MuiCardContent: {
                styleOverrides: {
                    root: {
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                        marginTop: '8px',
                        marginBottom: '8px',
                        [breakpoints.down('sm')]: {
                            paddingLeft: '8px !important',
                            paddingRight: '8px !important',
                        },
                    },
                },
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: {
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                        marginTop: '8px',
                        marginBottom: '8px',
                        [breakpoints.down('sm')]: {
                            paddingLeft: '8px !important',
                            paddingRight: '8px !important',
                        },
                    },
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        [breakpoints.down('sm')]: {
                            paddingLeft: '8px',
                            paddingRight: '8px',
                        },
                        [breakpoints.down('xs')]: {
                            paddingLeft: '4px',
                            paddingRight: '4px',
                        },
                    },
                },
            },
            MuiGrid: {
                styleOverrides: {
                    item: {
                        flexBasis: '100%',
                    },
                },
            },
        },
    }

    return createMuiTheme(themeObject)
}

const createTransition = (
    props: string[] = ['all'],
    {
        duration = '500ms',
        easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay = '0s',
    } = {},
) => props.map(p => `${p} ${duration} ${easing} ${delay}`).join(',')

