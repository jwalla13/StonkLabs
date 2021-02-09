import React, { Component } from "react";

{/* Signup Page HTML  */}
class Signup extends Component{
  render() {
    return (
      <div align="center">
        <div>
          <h1>Sign Up</h1>
        </div>
        <form>
        <label>
            First Name:
            <input type="text" />
            <br></br>
          </label>
          <label>
            Last Name:
            <input type="text" />
            <br></br>
          </label>
          <label>
            Email:
            <input type="text" />
            <br></br>
          </label>
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

export default Signup;