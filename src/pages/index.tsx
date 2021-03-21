import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { makePage } from "../components/Page"

export default makePage(() => (
  <article>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={['png']}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
  </article>
), {
  SeoProps: {
    title: 'Home',
  }
})
