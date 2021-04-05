import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Quote from './Quote'

export default function MeCard() {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} direction="row-reverse">
            <Grid item xs={12} sm={4} className={`${classes.gridItem} ${classes.avatarContainer}`}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography variant="h6">Philipp Fritsche</Typography>
            </Grid>
            <Grid item xs={12} sm={8} className={classes.gridItem}>
                <Typography variant="body1">
                    Open source enthusiast.
                    Enjoying to dig through codebases and develop APIs.
                    In love-hate relationship with every UI which is not a console.
                </Typography>
                <Quote>
                    Separation of concerns is always underrated.
                </Quote>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles({
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
})
