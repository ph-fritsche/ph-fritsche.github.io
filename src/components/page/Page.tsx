import React from 'react'
import { Container } from "@material-ui/core"
import Seo from './Seo'

export function Page({ children }: { children: React.ReactElement<any, React.JSXElementConstructor<any>>}) {
    const title = children.type.name

    return <>
        <Seo title={title}/>
        <Container sx={{maxWidth: 800}}>
            {children}
        </Container>
    </>
}
