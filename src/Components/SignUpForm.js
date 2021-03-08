import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
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
        if (this.state.username !== '' && this.state.firstname !== '' && this.state.lastname !== '' && this.state.password !== '') {
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
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                />
                </div>
                <div>
                <Button
                    type="submit"
                    value="Submit"
                    variant="contained"
                    fullWidth
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