import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import logo from '../StyleResources/logoStonk.png'
import apiClient from '../Util/apiClient.js'

const useStyles = makeStyles({
  headerInfo: {
    color: 'white',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    direction: 'column'
  },
  headerBox: {
    backgroundColor: '#2d2e2e'
  },
  buttonStyle: {
    color: '#2d2e2e',
    backgroundColor: '#8c92ac'
  }
})

function Home (props) {
  useEffect(() => {
    apiClient.updateCache()
  }, [])

  console.log(props)
  if (props.user.username !== '') {
    const targetUrl = window.location.origin + '/dashboard'
    window.location.href = targetUrl
  }

  const classes = useStyles()
  return (
    <Grid container className={classes.headerInfo}>
      <Grid item xs={3} />
      <Grid item xs={6} className={classes.headerBox}>
        <img src={logo} alt='' width='300' />
        <h1>Welcome To Stonk Labs</h1>
        <h2>Stonks only go up!</h2>
        <ButtonGroup className={classes.buttonStyle}>
          <Button component={Link} to='/login'>Login</Button>
          <Button component={Link} to='/signup'>Sign Up</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  )
}

export default Home
