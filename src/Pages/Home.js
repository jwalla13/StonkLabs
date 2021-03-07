import React, { Component, useEffect } from "react";
import { Container, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import logo from '../StyleResources/stonklabslogo.PNG'

const useStyles = makeStyles({
  headerInfo: {
    color: "white",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
    direction: "column"
  },
  headerBox: {
    backgroundColor: "#2d2e2e",
  },
  buttonStyle: {
    color: "#2d2e2e",
    backgroundColor: "#8c92ac"
  },
})

function Home(props) {

  /*useEffect(() => {
    axios.get('http://localhost:5000/update_cache/')
    .then(res => {
      console.log(res)
    })
    .catch(function (error) {
      //Not handling the error. Just logging into the console.
      console.log(error);
    });
  }, [])*/

  console.log(props)
  if (props.user.username != ""){
    const targetUrl = window.location.origin + "/dashboard"
    window.location.href = targetUrl;
  } /*else {
    const targetUrl = window.location.origin + "/signup"
    window.location.href = targetUrl;
  }
  */
  const classes = useStyles()
  return (
      <Grid container className={classes.headerInfo}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6} className={classes.headerBox}>
            <img src={logo} width="400"/>
            <h1>Welcome To Stonk Labs</h1>
            <h2>Stonks only go up!</h2>
            <ButtonGroup className={classes.buttonStyle}>
              <Button component={Link} to="/login">Login</Button>
              <Button component={Link} to="/signup">Sign Up</Button>
            </ButtonGroup>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
  );
}

export default Home;
