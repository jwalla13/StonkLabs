import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
    formStyle: {
    },
    submitStyle: {
      backgroundColor: "#A7A5A5",
      color: "black"
    },
  }) 

class LoginForm extends Component {
    initialState = {
        username: '',
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
        if (this.state.username != '' && this.state.password != '') {
            this.props.handleSubmit(this.state)
            this.setState(this.initialState)
            console.log("Success submission")
            event.preventDefault()
        }
    }

    render() {
        const { classes } = this.props
        const { username, password } = this.state
        return (
                <form className={classes.formStyle}>
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
                        autoFocus
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
                        fullWidth
                        variant="contained"
                        className={classes.submitStyle}
                        onClick={this.submitForm}
                        >
                        Login
                        </Button>
                    </div>
                </form>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LoginForm);