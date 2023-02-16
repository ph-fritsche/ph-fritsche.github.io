import * as React from 'react'
import { Article } from '~src/components/Article'
import Seo from '~src/components/Seo'

export default function NotFound() {
    return <>
        <Seo title="404"/>
        <Article>
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </Article>
    </>
}
