import React, { ComponentPropsWithRef } from 'react'
import { Code, Pre } from '~src/components/Code'

export { Link as a } from '~src/components/Link'
export { Typography as p } from '@mui/material'
export { default as blockquote } from '~src/components/Quote'

export function pre({children, ...others}: ComponentPropsWithRef<'pre'>) {
    const language = children
        && typeof children === 'object'
        && 'props' in children
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ? getLangFromClassName(String(children.props.className))
        : undefined

    return <Pre
        language={language}
        {...others}
    >{children}</Pre>
}

export function code({children, className, ...others}: ComponentPropsWithRef<'code'>) {
    return <Code
        language={getLangFromClassName(className)}
        className={className}
        {...others}
    >{children}</Code>
}
export { code as inlineCode }

function getLangFromClassName(className?: string) {
    return className?.match(/language-(\w+)/)?.[1]
}
