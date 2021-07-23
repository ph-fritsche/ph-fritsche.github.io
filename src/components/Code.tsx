import React, { ComponentProps, ComponentPropsWithoutRef } from 'react'
import { Box, useTheme } from '@material-ui/core';

import PrismHighlight from './PrismHighlight';

export function Pre({
    className,
    children,
    language,
    ...others
}: ComponentPropsWithoutRef<'pre'> & {language?: string}) {
    return (
        <Box component="pre"
            {...others}
            sx={{
                position: 'relative',
                '& code': {
                    display: 'block !important',
                    paddingTop: '1em !important',
                    paddingBottom: '1em !important',
                    maxWidth: '100%',
                    overflow: 'auto',
                },
            }}
            className={className}
        >
            {language && (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: '5%',
                    padding: '0px 8px',
                    borderBottomRightRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    background: theme => theme.palette.primary.main,
                    color: theme => theme.palette.primary.contrastText,
                    textTransform: 'uppercase',
                    boxShadow: '0px 1px 2px hsla(0, 0%, 0%, 50%)',
                }}>{language}</Box>
            )}
            {children}
        </Box>
    )
}

export function Code({
    language,
    children,
    className,
}: ComponentProps<'code'> & { language?: string }) {
    const theme = useTheme()

    const codeSx = {
        display: 'inline-block',
        padding: '0px 4px',
        borderRadius: '4px',
        backgroundColor: `${theme.palette.mode === 'light'
            ? `hsla(0, 0%, 0%, 7%)`
            : `hsla(0, 0%, 100%, 7%)`
        } !important`,
    }

    if (typeof children === 'string' && language) {
        return <PrismHighlight
            code={children.trim()}
            language={language}
            render={({className, getLineProps, getTokenProps, style, tokens}) => (
                <Box component="code"
                    sx={codeSx}
                    className={[className, className].join(' ')}
                    style={style}
                >
                    {tokens.map((line, key) => (
                        <div key={key} {...getLineProps({line})}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({token})}/>
                            ))}
                        </div>
                    ))}
                </Box>
            )}
        />
    }

    return (
        <Box component="code"
            sx={codeSx}
            className={className}
        >
            {children}
        </Box>
    )
}
