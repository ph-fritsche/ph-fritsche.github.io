import { Avatar, Button, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core'
import { OpenInNew } from '@material-ui/icons'
import * as React from 'react'
import projects from '~content/projects'
import { useDarkModeSwitch } from '~src/components/App/Config'
import Card from '~src/components/Card'
import Panel from '~src/components/Panel'
import Suspended from '~src/components/Suspended'
import { shuffle } from '~src/utils'

export default function Projects() {
    useDarkModeSwitch()

    const classes = useStyles()

    const shuffledProjects = React.useMemo(() => {
        return shuffle(projects)
    }, [])

    return (<>
        <Typography>Some open source projects I am very proud of contributing to:</Typography>
        <Panel columns={3}>
            { shuffledProjects.map(p => (
                <Card key={String(p.repo)}>
                    <CardHeader
                        avatar={
                            <Avatar
                                variant="rounded"
                                src={p.avatar}
                                classes={{
                                    root: classes.avatar,
                                    img: classes.avatarImg,
                                }}
                            />
                        }
                        title={<h3>{p.name}</h3>}
                    />
                    <CardContent>
                        {p.description}
                    </CardContent>
                    <CardActions>
                        <Suspended>
                            <Button href={String(p.repo)} target="_blank" startIcon={<OpenInNew/>}>
                View on { p.repo.host }
                            </Button>
                        </Suspended>
                    </CardActions>
                </Card>
            ))}
        </Panel>
    </>)
}

const useStyles = makeStyles(({
    avatar: {
        backgroundColor: 'hsla(0, 0%, 100%, .85)',
    },
    avatarImg: {
        'object-fit': 'contain !important',
        'width': '95% !important',
        'height': '95% !important',
    },
}))
