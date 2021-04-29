import { Avatar, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Quote from '~src/components/Quote'
import me from '~content/me'
import { rand } from '~src/utils'
import { Email } from '@material-ui/icons'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import { navigate } from 'gatsby'

export default function Home() {
    const classes = useStyles()

    useSwipeable({
        left: () => navigate('/projects'),
        up: () => navigate('/projects'),
    }, [])

    return <>
        <Seo/>
        <div>
            <Grid container className={classes.root} direction="row-reverse">
                <Grid item sm={4} className={`${classes.gridItem} ${classes.avatarContainer}`}>
                    <Avatar className={classes.avatar} src={me.avatar}></Avatar>
                    <Typography variant="h6">{me.name}</Typography>
                </Grid>
                <Grid item sm={8} className={classes.gridItem}>
                    <Typography variant="body1">{me.description}</Typography>
                    <Quote>{me.quotes[rand(0, me.quotes.length -1)]}</Quote>
                </Grid>
                <Grid item className={classes.actions}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<img
                            src="https://github.githubassets.com/favicons/favicon.svg"
                            className={classes.icon}
                            alt=""
                        />}
                        href={me.github}
                        target="_blank"
                        className={classes.actionsButton}
                    >
                        Github profile
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Email/>}
                        href={`mailto:${me.email}`}
                        target="_blank"
                        className={classes.actionsButton}
                    >
                        Email me
                    </Button>
                </Grid>
            </Grid>
        </div>
    </>
}

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '10vh',
        marginBottom: '10vh',
    },
    avatar: {
        width: '180px !important',
        height: '180px !important',
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
    },
    actions: {
        textAlign: 'center',
        '& > *': {
            margin: '16px !important',
        },
    },
    actionsButton: {
        background: `${theme.palette.primary.light} !important`,
    },
    icon: {
        height: '1em',
    },
}))
