import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, makeStyles, Typography } from "@material-ui/core"
import { OpenInNew } from "@material-ui/icons"
import * as React from "react"
import projects from '~content/projects'
import { useDarkModeSwitch } from "~src/components/App/Config"

export default function Projects() {
  useDarkModeSwitch()

  const classes = useStyles()

  return (<>
    <Typography>Some open source projects I am very proud of contributing to:</Typography>
    <div className={classes.grid}>

      { projects.map(p => (
        <div>
          <Card
            classes={{
              root: classes.card,
            }}
          >
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
              <Button href={String(p.repo)} target="_blank" startIcon={<OpenInNew/>}>
                View on { p.repo.host }
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  </>)
}

const useStyles = makeStyles(theme => ({
  grid: {
    [theme.breakpoints.up('xs')]: { columnCount: 1 },
    [theme.breakpoints.up('sm')]: { columnCount: 2 },
    [theme.breakpoints.up('md')]: { columnCount: 3 },
    display: 'block !important',
    '& > *': {
      paddingTop: '8px',
      paddingBottom: '8px',
      breakInside: 'avoid',
    },
  },
  card: {
    '& > *': {
      paddingTop: '0 !important',
      paddingBottom: '0 !important',
      marginTop: '8px',
      marginBottom: '8px',
    },
  },
  avatar: {
    backgroundColor: 'hsla(0, 0%, 100%, .85)',
  },
  avatarImg: {
    'object-fit': 'contain !important',
    'width': '95% !important',
    'height': '95% !important',
  },
}))
