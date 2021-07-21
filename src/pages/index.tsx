import { Avatar, Button, Grid, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import Quote from '~src/components/Quote'
import me from '~content/me'
import { rand } from '~src/utils'
import { Email } from '@material-ui/icons'
import Seo from '~src/components/Seo'
import { useSwipeable } from '~src/components/Swipeable'
import { navigate } from 'gatsby'
import GithubIcon from '~res/images/github'
import Me from '~content/me.jpg'

export default function Home() {
    useSwipeable({
        left: () => navigate('/projects'),
        up: () => navigate('/projects'),
    }, [])

    const theme = useTheme()

    return <>
        <Seo/>
        <div>
            <Grid container direction="row-reverse" sx={{
                marginTop: '10vh',
                marginBottom: '10vh',
            }}>
                <Grid item sm={4} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Avatar src={Me} sx={{
                        width: '180px !important',
                        height: '180px !important',
                    }}/>
                    <Typography variant="h6">{me.name}</Typography>
                </Grid>
                <Grid item sm={8} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Typography variant="body1">{me.description}</Typography>
                    <Quote bg="dark">{me.quotes[rand(0, me.quotes.length -1)]}</Quote>
                </Grid>
                <Grid item sx={{
                    textAlign: 'center',
                    '& > *': {
                        margin: '16px !important',
                    },
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GithubIcon/>}
                        href={`https://github.com/${me.github}`}
                        target="_blank"
                        sx={{
                            background: `${theme.palette.primary.light} !important`,
                            color: `${theme.palette.getContrastText(theme.palette.primary.light)} !important`,
                        }}
                    >
                        Github profile
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Email/>}
                        href={`mailto:${me.email}`}
                        target="_blank"
                        sx={{
                            background: `${theme.palette.primary.light} !important`,
                            color: `${theme.palette.getContrastText(theme.palette.primary.light)} !important`,
                        }}
                    >
                        Email me
                    </Button>
                </Grid>
            </Grid>
        </div>
    </>
}
