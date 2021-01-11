import React, { Component } from "react";

import "../../css/Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login__container">
          <form action="" method="POST">
            <input
              type="text"
              name="username"
              placeholder="username"
              className="login__textInput"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="login__textInput"
              required
            />
            <input type="submit" value="Login" className="login__btnInput btn" required />
            <div className="login__otherSelection">
              <h5>Forgot password?</h5>
              <h5>Create an account.</h5>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
