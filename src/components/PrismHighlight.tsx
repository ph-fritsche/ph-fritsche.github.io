import React, { ComponentProps } from 'react'
import { useTheme } from '@mui/material'
import Highlight, { defaultProps, Language, Prism } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/vsDark'
import lightTheme from 'prism-react-renderer/themes/vsLight';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
((typeof global !== 'undefined' ? global : window) as any).Prism = Prism
require('prismjs/components/prism-php')

export default function PrismHighlight({
    code,
    language,
    render,
}: {
    code: string
    language: string
    render: ComponentProps<typeof Highlight>['children']
}) {
    const theme = useTheme()

    return <Highlight
        {...defaultProps}
        theme={theme.palette.mode === 'light' ? lightTheme : darkTheme}
        code={code}
        language={language as Language}
    >{render}</Highlight>
}
