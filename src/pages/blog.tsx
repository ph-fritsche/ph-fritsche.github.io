import { CardActionArea, CardContent, CardHeader } from '@material-ui/core'
import * as React from 'react'
import { useDarkModeSwitch } from '~src/components/App/Config'
import Card from '~src/components/Card'
import { getLinkProps } from '~src/components/Link'
import Panel from '~src/components/Panel'
import Suspended from '~src/components/Suspended'
import { useBlogQuery } from '~src/query/blog'

export default function Blog() {
    useDarkModeSwitch()

    const result = useBlogQuery()

    return <>
        <Panel>
            {result.allMdx.edges.map(({ node }) => (
                <Card key={node.meta.slug}>
                    <Suspended>
                        <CardActionArea {...getLinkProps(`/blog/${node.meta.slug}`)}>
                            <CardHeader
                                title={node.meta.title}
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
