import TextField from '@material-ui/core/TextField'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import createData from '../Components/UserAccountTable'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    formStyle: {
    },
    submitStyle: {
      backgroundColor: "#A7A5A5",
      color: "black"
    },
  }) 

// issue: on successful form submit, required error tag will still show
class SignUpForm extends Component {

    initialState = {
        username: '',
        firstname: '',
        lastname: '',
        password: '',
    }

    state = this.initialState

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    submitForm = event => {
        if (this.state.username != '' && this.state.firstname != '' && this.state.lastname != '' && this.state.password != '') {
            this.props.handleSubmit(this.state)
            this.setState(this.initialState)
            event.preventDefault()
        }
    }

    render() {
        const { classes } = this.props
        const { username, firstname, lastname, password } = this.state
        return (
            <form className={classes.formStyle}>
                <div>
                <TextField 
                    variant="outlined" 
                    id="firstname" 
                    label="First Name"
                    name="firstname"
                    value={firstname}
                    required
                    margin="normal"
                    fullwidth
                    autoFocus
                    onChange={this.handleChange}
                />
                </div>
                <div>
                <TextField 
                    variant="outlined" 
                    id="lastname" 
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    required
                    margin="normal"
                    fullwidth
                    onChange={this.handleChange}
                />
                </div>
                <div>
                <TextField 
                    variant="outlined" 
                    id="username" 
                    label="Username"
                    name="username"
                    value={username}
                    required
                    margin="normal"
                    fullwidth
                    onChange={this.handleChange}
                />
                </div>
                <div>
                <TextField
                    variant="outlined" 
                    id="password" 
                    label="Password"
                    name="password"
                    value={password}
                    required
                    margin="normal"
                    fullwidth
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                />
                </div>
                <div>
                <Button
                    type="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    className={classes.submitStyle}
                    onClick={this.submitForm}
                >
                    Sign Up
                </Button>
                </div>
            </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SignUpForm);