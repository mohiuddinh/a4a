import React, { Component } from "react";
import { Link } from "@reach/router";
import axios from "axios";

import "../../css/Login.css";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Login extends Component {
  onSubmit = (e) => {
    console.log("form was submitted");
    e.preventDefault();

    const loginMessage = document.getElementById("login__message");

    const login = {
      username: this.username,
      password: this.password,
    };

    axios.post("/api/login", login).then((res) => {
      if (res.data.status === "ok") {
        loginMessage.innerHTML = "Success!";
      } else {
        loginMessage.innerHTML = res.data.error;
      }
    });
  };

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <form id="login-form" onSubmit={this.onSubmit}>
            <h1 id="login__message"></h1>
            <div className="login__control">
              <input
                type="text"
                name="username"
                placeholder="username"
                className="login__textInput"
                required
                onChange={(e) => (this.username = e.target.value)}
              />
            </div>
            <div className="login__control">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="login__textInput"
                required
                onChange={(e) => (this.password = e.target.value)}
              />
            </div>
            <div className="login__control">
              <input type="submit" value="Login" className="login__btnInput btn" required />
            </div>
            <div className="login__control">
              <Link to="/email-password-link" style={link_style}>
                <h5 className="login__forgotPassword">Forgot password?</h5>
              </Link>
              <Link to="/register" style={link_style}>
                <h5 className="login__createAccount">Create an account!</h5>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
