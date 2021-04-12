import { CardActionArea, CardContent, CardHeader } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { useDarkModeSwitch } from "~src/components/App/Config"
import Card from "~src/components/Card"
import { getLinkProps } from "~src/components/Link"
import Panel from "~src/components/Panel"
import Suspended from "~src/components/Suspended"

export default function Blog() {
    useDarkModeSwitch()

    const pageSize = 10
    const pageStart = 0

    const result = useStaticQuery(graphql`
query MyQuery {
  allMdx(
    filter: {fileAbsolutePath: {regex: "//content/blog//"}}
    sort: {fields: frontmatter___date, order: DESC}
    limit: 10
    skip: 0
  ) {
    pageInfo {
      currentPage
      pageCount
      hasNextPage
      hasPreviousPage
      totalCount
      perPage
    }
    edges {
      node {
        frontmatter {
          title
          date
        }
        parent {
          ... on File {
            name
          }
        }
        excerpt(pruneLength: 180)
      }
    }
  }
}
    `)

    return <>
        <Panel>
            {result.allMdx.edges.map(({node}: any) => (
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
