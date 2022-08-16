import React, { SyntheticEvent } from 'react'
import { navigate } from 'gatsby'
import { Link as MuiLink } from '@mui/material'

export function Link({
    href,
    children,
}: React.PropsWithChildren<{
    href: string
}>) {
    return <MuiLink {...getLinkProps(href)}>{children}</MuiLink>
}

export function getLinkProps(to: string) {
    const destination = getLinkDestination(to)

    return typeof destination === 'function'
        ? { onClick: destination, href: to }
        : { href: destination, target: '_blank' }
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
