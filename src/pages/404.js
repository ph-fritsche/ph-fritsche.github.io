import * as React from "react"
import { Article } from "../components/Article/Article"

import { makePage } from "../components/Page"

export default makePage(() => (
  <Article>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Article>
), {
  SeoProps: {
    title: "Not Found",
  },
})
