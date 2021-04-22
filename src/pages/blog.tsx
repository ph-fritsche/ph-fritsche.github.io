import { CardActionArea, CardContent, CardHeader } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { useDarkModeSwitch } from "~src/components/App/Config"
import Card from "~src/components/Card"
import { getLinkProps } from "~src/components/Link"
import Panel from "~src/components/Panel"
import Suspended from "~src/components/Suspended"
import { useBlogQuery } from "~src/query/blog"

export default function Blog() {
  useDarkModeSwitch()

  const pageSize = 10
  const pageStart = 0

  const result = useBlogQuery()

  return <>
    <Panel>
      {result.allMdx.edges.map(({ node }: any) => (
        <Card>
          <Suspended>
            <CardActionArea {...getLinkProps(`/blog/${node.parent.name}`)}>
              <CardHeader
                title={node.frontmatter.title}
              />
              <CardContent>
                {node.excerpt}
              </CardContent>
            </CardActionArea>
          </Suspended>
        </Card>

      ))}
    </Panel>
  </>
}
