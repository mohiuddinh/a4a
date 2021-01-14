import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../css/Login.css";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Login extends Component {
  componentDidMount() {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", loginUser);

    async function loginUser(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const message = document.getElementById("login__message");

      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((res) => res.json());

      if (result.status === "ok") {
        console.log("Got the token: ", result.data);
        localStorage.setItem("token", result.data);
        message.innerHTML = "Success!";
      } else {
        message.innerHTML = result.error + " !";
      }
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <form id="login-form">
            <h1 id="login__message"></h1>
            <div className="login__control">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="login__textInput"
                required
              />
            </div>
            <div className="login__control">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="login__textInput"
                required
              />
            </div>
            <div className="login__control">
              <input type="submit" value="Login" className="login__btnInput btn" required />
            </div>
            <div className="login__control">
              <Link to="/change-password" style={link_style}>
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
