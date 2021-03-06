import React, { Component } from "react";
import { Button, Typography, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'
import UserAccountTable from '../Components/UserAccountTable'
import SignUpForm from '../Components/SignUpForm'
import axios from 'axios';

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
  navButtons: {
  }
}) 

class Signup extends Component {

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

  handleSubmit = character => {
    this.makePostCall(character).then( callResult => {
       if (callResult[0] === true) {
          character['id'] = callResult[1]['id']
          character['username'] = callResult[1]['username']
          character['firstname'] = callResult[1]['firstname']
          character['lastname'] = callResult[1]['lastname']
          character['password'] = callResult[1]['password']
          this.setState({ characters: [...this.state.characters, character] });
          this.handleRegSuccess(character)
       }
    });
  }

  handleRegSuccess = character => {
    this.props.handleLogin(character)
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

  makePostCall(character){
    return axios.get('http://localhost:5000/c_acc/' + character['firstname'] + '/' + character['lastname'] + '/'
                    + character['username'] + '/' + character['password'])
     .then(function (response) {
       console.log(response);
       return [response.status === 201, response.data]
     })
     .catch(function (error) {
       console.log(error);
       return false;
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

  render() {

    const { classes } = this.props
    const { characters } = this.state

    return (
        <Grid container direction="column">
          <Grid item container>
            <Grid item xs={3}></Grid>

            <Grid className={classes.loginModule} item container xs={6} direction="column">
              <Grid item className={classes.navButtons}>
                <Button component={Link} to="/login" size="large" variant="outlined"> Login </Button>
                <Button component={Link} to="/signup" disabled size="large" variant="outlined"> Sign Up </Button>
              </Grid>

              <Typography variant="h3" className={classes.loginHeader}>Sign Up</Typography> 
              <SignUpForm handleSubmit={this.handleSubmit}/>
            </Grid>
            
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Signup);
