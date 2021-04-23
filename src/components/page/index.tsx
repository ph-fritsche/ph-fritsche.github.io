import React from 'react'
import Container from '~src/components/App/Container'
import Seo from './Seo'

export default function Page({
    children,
}: {
    children: React.ReactNode,
}) {
    const title = isComponentNode(children)
        ? children.type.title ?? children.type.name
        : ''

    return <>
        <Seo title={title}/>
        <Container>
            {children}
        </Container>
    </>
}

const isComponentNode = <
    T extends React.ReactNode,
>(
        node: T,
    ): node is T & {type: (() => unknown) & {title?: string}} => {
    if( typeof node === 'object'
        && node !== null
        && typeof (node as {type?: unknown}).type === 'function'
    ) {
        const n = node as { type: React.ComponentType & {title?: unknown}}
        return typeof n.type.title === 'undefined'
            || typeof n.type.title === 'string'
    }
    return false
}
