import { Avatar, Button, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core'
import { OpenInNew } from '@material-ui/icons'
import { navigate } from 'gatsby'
import * as React from 'react'
import projects from '~content/projects'
import { useDarkModeSwitch } from '~src/components/App/Config'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import { shuffle } from '~src/utils'

export default function Projects() {
    useDarkModeSwitch()

    useSwipeable({
        left: () => navigate('/blog'),
        right: () => navigate('/'),
    }, [])

    const shuffledProjects = React.useMemo(() => {
        return shuffle(projects)
    }, [])

    return <>
        <Seo title="Projects"/>
        <Typography>Some open source projects I am very proud of contributing to:</Typography>
        <Panel columns={3}>
            { shuffledProjects.map(p => (
                <Card key={String(p.repo)}>
                    <CardHeader
                        avatar={
                            <Avatar
                                variant="rounded"
                                src={p.avatar}
                                imgProps={{
                                    style: {
                                        objectFit: 'contain',
                                        width: '95%',
                                        height: '95%',
                                    },
                                }}
                            />
                        }
                        title={<h3>{p.name}</h3>}
                    />
                    <CardContent>
                        {p.description}
                    </CardContent>
                    <CardActions>
                        <Button href={String(p.repo)} target="_blank" startIcon={<OpenInNew/>}>
                            View on { p.repo.host }
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Panel>
    </>
}
