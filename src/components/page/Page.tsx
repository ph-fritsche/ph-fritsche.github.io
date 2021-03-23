import React from 'react'
import { Container } from "@material-ui/core"
import Seo from './Seo'

export function Page({
    children
}: {
    children: React.ReactNode,
}) {
    const title = isComponentNode(children)
        ? children.type.title ?? children.type.name
        : ''

    return <>
        <Seo title={title}/>
        <Container sx={{maxWidth: 800}}>
            {children}
        </Container>
    </>
}

const isComponentNode = <
    T extends React.ReactNode,
>(
    node: T,
): node is T & {type: Function & {title?: string}} => {
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
