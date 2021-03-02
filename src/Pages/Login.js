import React, { Component } from "react";
import { Button, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import LoginForm from '../Components/LoginForm'
import axios from 'axios'
import UserAccountTable from '../Components/UserAccountTable'

const styles = theme => ({
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

class Login extends Component {

  state = {
    characters: [

    ]
  } 

  componentDidMount() {
    axios.get('http://localhost:5000/users')
     .then(res => {
       const characters = res.data.users_list;
       this.setState({ characters });
     })
     .catch(function (error) {
       //Not handling the error. Just logging into the console.
       console.log(error);
     });
  }

  removeCharacter = index => {
    const { characters } = this.state
    
    this.makeDelCall(characters, index).then( callResult => {
      if (callResult === true) {
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index
          }),
        })
      }
    });
  }

  makeDelCall(characters, index) {
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

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
       if (callResult[0] === true) {
          character['id'] = callResult[1]['id']
          character['username'] = callResult[1]['username']
          character['firstname'] = callResult[1]['firstname']
          character['lastname'] = callResult[1]['lastname']
          character['password'] = callResult[1]['password']
          this.handleLoginSuccess(character)
       }
       else {
         console.log("login error")
       }
    });
  }

  handleLoginSuccess = character => {
    this.props.handleLogin(character)
  }

  makePostCall(character){
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

  render() {
    const { classes } = this.props
    const { characters } = this.state

    return(
        <Grid container direction="column">
          <UserAccountTable characterData={characters} removeCharacter={this.removeCharacter}/>
          <Grid item container>
            <Grid item xs={3}></Grid>

            <Grid className={classes.loginModule} item container xs={6} direction="column">
              <Grid item className={classes.navButtons}>
                <Button component={Link} to="/login" disabled size="large" variant="outlined"> Login </Button>
                <Button component={Link} to="/signup" size="large" variant="outlined"> Sign Up </Button>
              </Grid>

              <Typography variant="h3" className={classes.loginHeader}>Login</Typography> 
              <LoginForm handleSubmit={this.handleSubmit}/>
            </Grid>
            
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login);
