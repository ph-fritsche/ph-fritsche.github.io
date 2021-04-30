import React, { ComponentProps } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import darkTheme from 'prism-react-renderer/themes/vsDark';
import lightTheme from 'prism-react-renderer/themes/vsLight';
import { makeStyles, useTheme } from '@material-ui/core';

export function Pre({
    className,
    children,
    language,
    ...others
}: ComponentProps<'pre'> & {language?: string}) {
    const classes = useStyles()

    return (
        <pre {...others} className={[className, classes.pre].join(' ')}>
            {language && <div className={classes.language}>{language}</div>}
            {children}
        </pre>
    )
}

export function Code({
    language,
    children,
    ...others
}: ComponentProps<'code'> & { language?: string }) {
    const classes = useStyles()
    const theme = useTheme()

    if (typeof children === 'string' && language) {
        return <Highlight
            {...defaultProps}
            code={children.trim()}
            language={language as Language}
            theme={theme.palette.mode === 'light' ? lightTheme : darkTheme}
        >
            {({className, getLineProps, getTokenProps, style, tokens}) => (
                <code
                    className={[others.className, className, classes.code].join(' ')}
                    style={style}
                >
                    {tokens.map((line, key) => (
                        <div key={key} {...getLineProps({line})}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({token})}/>
                            ))}
                        </div>
                    ))}
                </code>
            )}
        </Highlight>
    }
    return (
        <code className={[others.className, classes.code].join(' ')}>
            {children}
        </code>
    )
}

const useStyles = makeStyles(theme => ({
    pre: {
        position: 'relative',
        '& code': {
            display: 'block !important',
            paddingTop: '1em !important',
            paddingBottom: '1em !important',
            maxWidth: '100%',
            overflow: 'auto',
        },
    },
    language: {
        position: 'absolute',
        top: 0,
        right: '5%',
        padding: '0px 8px',
        borderBottomRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textTransform: 'uppercase',
        boxShadow: '0px 1px 2px hsla(0, 0%, 0%, 50%)',
    },
    code: {
        display: 'inline-block',
        padding: '0px 4px',
        borderRadius: '4px',
        backgroundColor: `${theme.palette.mode === 'light'
            ? `hsla(0, 0%, 0%, 7%)`
            : `hsla(0, 0%, 100%, 7%)`
        } !important`,
    },
}))
