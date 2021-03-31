import React, { SyntheticEvent } from 'react'
import { navigate } from "gatsby"
import { Link as MuiLink } from '@material-ui/core'

export function Link({
    to,
    children
}: React.PropsWithChildren<{
    to: string
}>) {

    return <MuiLink {...getLinkProps(to)}>{children}</MuiLink>
}

export function getLinkProps(to: string) {
    const destination = getLinkDestination(to)

    return typeof destination === 'function'
        ? { onClick: destination, href: to }
        : { href: destination }
}

function getLinkDestination(destination: string) {
    const isInternal = destination.startsWith('.')
        || destination.startsWith('/') && destination[1] !== '/'

    if (isInternal) {
        return (e: SyntheticEvent) => {
            navigate(destination)
            e.preventDefault()
        }
    }
    return destination
}
