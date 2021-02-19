import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/styles'
 
const styles = theme => ({
    brandStyle: {
        flex : 1,
        color : "black"
    },
    iconStyle: {
        color : "black"
    },
    accountStatus: {
        color: "black"
    },
    appBarStyle: {
        backgroundColor: "#AAF0D1"
    } 
})

class Nav extends Component {

    render() {
        const { classes } = this.props

        if (this.props.loggedIn) {
            return (
                <Grid container>
                    <AppBar position="static" className={classes.appBarStyle}>
                        <Toolbar>
                            <Typography className={classes.brandStyle}>Stonk Labs</Typography>
                            <Button component={Link} to="/"> Home </Button>
                            <Button component={Link} to="/dashboard"> Dashboard </Button>
                            <AccountCircleIcon className={classes.iconStyle} />
                            <Typography className={classes.accountStatus}>{this.props.loggedUsername}</Typography>
                            <Button onClick={this.props.handleLogout}> Logout </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
            );
        }
        else {
            return (
                <Grid container>
                    <AppBar position="static" className={classes.appBarStyle}>
                        <Toolbar>
                            <Typography className={classes.brandStyle}>Stonk Labs</Typography>
                            <Button component={Link} to="/"> Home </Button>
                            <Button component={Link} to="/dashboard"> Dashboard </Button>
                            <AccountCircleIcon className={classes.iconStyle} />
                            <Typography className={classes.accountStatus}>Not Signed In</Typography>
                            <Button component={Link} to="/login"> Login </Button>
                            <Button component={Link} to="/signup"> Signup </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
            );
        }
    }
}
 
export default withStyles(styles, { withTheme: true })(Nav);