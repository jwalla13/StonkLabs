import React, { useState } from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import LoginForm from '../Components/LoginForm'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles({
  loginModule: {
    backgroundColor: '#8C92AC',
    alignItems: 'center'
  },
  loginHeader: {
    color: 'black'
  },
  backgroundStyle: {
    backgroundColor: '#E5E5E5'
  },
  formStyle: {
  },
  submitStyle: {
    backgroundColor: '#A7A5A5',
    color: 'black'
  },
  navButtons: {
  }
})

function Login (props) {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleSubmit = character => {
    makePostCall(character).then(callResult => {
      if (callResult[0] === true) {
        character.id = callResult[1].id
        character.username = callResult[1].username
        character.firstname = callResult[1].firstname
        character.lastname = callResult[1].lastname
        character.password = callResult[1].password
        handleLoginSuccess(character)
      } else {
        handleLoginError()
      }
    })
  }

  const handleLoginError = () => {
    console.log('login error')
    setOpen(true)
  }

  const handleLoginSuccess = character => {
    props.handleLogin(character)
  }

  const makePostCall = character => {
    return axios.get('http://localhost:5000/login/' + character.username + '/' + character.password)
      .then(function (response) {
        console.log(response)
        return [response.status === 201, response.data]
      })
      .catch(function (error) {
        console.log(error)
        return false
      })
  }
  return (
    <Grid container direction='column'>
      <Grid item container>
        <Grid item xs={3} />

        <Grid className={classes.loginModule} item container xs={6} direction='column'>
          <Collapse in={open}>
            <Alert
              severity='error'
              action={
                <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <CloseIcon fontSize='inherit' />
                </IconButton>
                }
            >
              Username or Password Incorrect!
            </Alert>
          </Collapse>
          <Grid item className={classes.navButtons}>
            <Button component={Link} to='/login' disabled size='large' variant='outlined'> Login </Button>
            <Button component={Link} to='/signup' size='large' variant='outlined'> Sign Up </Button>
          </Grid>

          <Typography variant='h3' className={classes.loginHeader}>Login</Typography>
          <LoginForm handleSubmit={handleSubmit} />
        </Grid>

        <Grid item xs={3} />
      </Grid>
    </Grid>
  )
}

export default Login
