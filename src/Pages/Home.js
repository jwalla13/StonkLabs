import React, { Component } from "react";
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function Home(props) {
  console.log(props)
  if (props.user.username != ""){
    const targetUrl = window.location.origin + "/dashboard"
    window.location.href = targetUrl;
  } else {
    const targetUrl = window.location.origin + "/signup"
    window.location.href = targetUrl;
  }
  return (
    <div>
      <div align="center">
          <h1>Welcome To Stonk Labs</h1>
      </div>
    </div>
  );
}

export default Home;
