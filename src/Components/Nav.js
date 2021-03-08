import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { withStyles } from '@material-ui/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
    appBarStyle: {
        backgroundColor: "#AAF0D1",
        color: "black"
    },
    rightElements: {
        float : "right"
    }
})

class Nav extends Component {

    state = {
        anchor: null
    }

    handleClick = event => {
        this.setState({anchor: event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchor: null})
    }

    handleNavLogout = () => {
        this.setState({anchor: null});
        this.props.handleLogout();
    }

    render() {
        const { classes } = this.props

        if (this.props.user.loggedIn) {
            return (
                <Grid container>
                    <AppBar position="static" className={classes.appBarStyle}>
                        <Toolbar className={classes.toolBarStyle}>
                            <ShowChartIcon/>
                            <Typography className={classes.brandStyle}>Stonk Labs</Typography>
                            {/*<AccountCircleIcon className="account-icon"/>*/}
                            <span className="username-icon">
                                <Button aria-controls="simple-menu" aria-haspopup="true" variant="outlined" onClick={this.handleClick}>
                                    {this.props.user.username}
                                </Button>
                            </span>
                            <Menu
                                TransitionComponent={Fade}
                                id="simple-menu"
                                anchorEl={this.state.anchor}
                                keepMounted
                                open={Boolean(this.state.anchor)}
                                onClose={this.handleClose}
                            >
                                <MenuItem 
                                    component={Link} to="/login"
                                    onClick={this.handleNavLogout}>
                                        Logout
                                </MenuItem>
                            </Menu>
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
                            <ShowChartIcon/>
                            <Typography>Stonk Labs</Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
            );
        }
    }
}
 
export default withStyles(styles, { withTheme: true })(Nav);