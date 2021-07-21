import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import { alpha, AppBar as MuiAppBar, Box, Button, IconButton, Theme, useTheme } from '@material-ui/core';
import { SettingsBrightness } from '@material-ui/icons'
import { getLinkProps } from '~src/components/Link';
import Container from './Container';
import { useConfig } from './Config';

export default function AppBar({
    sx: sxProp,
}: {
    sx: ComponentProps<typeof MuiAppBar>['sx']
}) {
    const anchorEl = useRef<HTMLDivElement>(null)
    const [anchored, setAnchored] = useState(true)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach(entry => {
            setAnchored(entry.isIntersecting)
        }))
        observer.observe(anchorEl.current as HTMLDivElement)
        return () => observer.disconnect()
    }, [])

    const {
        settings: [config, setConfig],
        state: [configState],
    } = useConfig()

    const sx = makeSx(useTheme())

    return (<>
        <div
            ref={anchorEl}
            style={{
                position: 'absolute',
                height: '1px',
                top: 0,
            }}
        />

        <MuiAppBar
            position="sticky"
            sx={{
                ...sxProp,
                ...sx.appBar,
                ...(anchored ? sx.appBarAnchored : undefined),
            }}
            elevation={anchored ? 0 : 4}
        >
            <Container sx={sx.appBarContainer}>
                <nav>
                    <Box component="ul" sx={sx.navList}>
                        { navigationLinks.map(({name, to}) => (
                            <Button
                                key={to}
                                component="li"
                                {...getLinkProps(to)}
                                sx={sx.appBarButton}
                            >
                                {name}
                            </Button>
                        ))}
                    </Box>
                </nav>
                <Box sx={sx.options}>
                    {configState.darkModeSwitch && (
                        <IconButton
                            size="small"
                            onClick={() => setConfig({darkMode: !config.darkMode})}
                            sx={config.darkMode ? sx.nightModeOff : sx.nightModeOn}
                        >
                            <SettingsBrightness/>
                        </IconButton>
                    )}
                </Box>
            </Container>
        </MuiAppBar>
    </>)
}

const makeSx = (theme: Theme) => ({
    appBar: {
        minHeight: '5vh',
        color: 'inherit !important',
        opacity: .97,
        '&:hover': {
            opacity: 1,
        },
        borderBottom: `1px solid ${alpha(theme.palette.text.primary, .5)}`,
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 0s !important',
        justifyContent: 'center',
    },
    appBarAnchored: {
        opacity: 1,
        borderBottom: '1px solid transparent',
    },
    appBarContainer: {
        display: 'flex !important',
        flexDirection: 'row',
        alignItems: 'center',
    },
    appBarButton: {
        color: `${theme.palette.primary.light} !important`,
    },
    navList: {
        marginBlock: 0,
        padding: 0,
        marginLeft: '-10px',
    },
    options: {
        marginLeft: 'auto',
    },
    nightModeOn: {
        background: '#fff !important',
        color: '#000 !important',
    },
    nightModeOff: {
        background: '#000 !important',
        color: '#fff !important',
    },
} as const)

const navigationLinks = [
    {name: 'Home', to: '/'},
    {name: 'Projects', to: '/projects'},
    {name: 'Blog', to: '/blog'},
]
