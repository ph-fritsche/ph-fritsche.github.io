import React from 'react'
import { Container } from "@material-ui/core"
import Seo from './Seo'

export function Page({ children, ...props }: { children: React.ReactElement<any, React.JSXElementConstructor<any>>}) {
    return <>
        <Seo title={children.type.name}/>
        <Container sx={{maxWidth: 800}}>
            {children}
        </Container>
    </>
}
