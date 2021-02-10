import React, { Component } from "react";

class Login extends Component{
  render() {
    return (
      <div align="center">
        <div>
          <h1>Login</h1>
        </div>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
            <br></br>
          </label>
          <label>
            Password:
            <input type="text" name="password" />
            <br></br>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      );
  }
}

export default Login;
