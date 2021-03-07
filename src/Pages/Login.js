import React, { Component, useState } from "react";
import { Button, Typography, Grid, Container } from '@material-ui/core'
import { makeStyles  } from '@material-ui/styles'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import LoginForm from '../Components/LoginForm'
import axios from 'axios'
import UserAccountTable from '../Components/UserAccountTable'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles ({
  loginModule: {
    backgroundColor: '#8C92AC',
    alignItems: "center",
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
    backgroundColor: "#A7A5A5",
    color: "black"
  },
  navButtons: {
  }
})

function Login (props) {
  const [characters, setCharacters] = useState([])
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const componentDidMount = () => {
    axios.get('http://localhost:5000/users')
     .then(res => {
       const characters = res.data.users_list;
       setCharacters({ characters });
     })
     .catch(function (error) {
       //Not handling the error. Just logging into the console.
       console.log(error);
     });
  }

  const removeCharacter = index => {
    const { characters } = characters
    
    makeDelCall(characters, index).then( callResult => {
      if (callResult === true) {
        setCharacters({
          characters: characters.filter((character, i) => {
            return i !== index
          }),
        })
      }
    });
  }

  const makeDelCall = (characters, index) => {
    return axios.delete('http://localhost:5000/users', { data: characters[index] })
    .then(function (response) {
      console.log(response);
      return response.status === 200
    })
    .catch(function (error) {
      console.log(error);
      return false
    })
  }

  const handleSubmit = character => {
    makePostCall(character).then( callResult => {
       if (callResult[0] === true) {
          character['id'] = callResult[1]['id']
          character['username'] = callResult[1]['username']
          character['firstname'] = callResult[1]['firstname']
          character['lastname'] = callResult[1]['lastname']
          character['password'] = callResult[1]['password']
          handleLoginSuccess(character)
       }
       else {
         handleLoginError()
       }
    });
  }

  const handleLoginError = () => {
    console.log("login error");
    setOpen(true)
  }

  const handleLoginSuccess = character => {
    props.handleLogin(character)
  }

  const makePostCall = character => {
    return axios.get('http://localhost:5000/login/' + character['username'] + '/' + character['password'])
     .then(function (response) {
       console.log(response);
       return [response.status === 201, response.data]
     })
     .catch(function (error) {
       console.log(error);
       return false;
     });
  }
    return(
        <Grid container direction="column">
          <Grid item container>
            <Grid item xs={3}></Grid>

            <Grid className={classes.loginModule} item container xs={6} direction="column">
              <Collapse in={open}>
                <Alert
                severity="error"
                action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
                }
                >
                Username or Password Incorrect!
                </Alert>
              </Collapse>
              <Grid item className={classes.navButtons}>
                <Button component={Link} to="/login" disabled size="large" variant="outlined"> Login </Button>
                <Button component={Link} to="/signup" size="large" variant="outlined"> Sign Up </Button>
              </Grid>

              <Typography variant="h3" className={classes.loginHeader}>Login</Typography>
              <LoginForm handleSubmit={handleSubmit}/>
            </Grid>
            
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
    )
}

export default Login;
