import * as React from "react"
import { Article } from '~src/components/Article'

export default function Blog() {

    return <>
        <h1>Hi people</h1>
        <Article>
            Lorem ipsum dolor.
        </Article>
    </>
}

Blog.title = 'foo'
