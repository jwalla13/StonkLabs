import React, { Component } from "react";

class Home extends Component{
  render() {
    return (
        <div align="center">
            <h1>Welcome To Stonk Labs</h1>
            <h2><a href="/login">Login</a></h2>
            <h2><a href="/signup">Sign Up</a></h2>
        </div>
      );
  }
}

export default Home;
