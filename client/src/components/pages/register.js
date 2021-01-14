import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

import "../../css/Register.css";

class Register extends Component {
  componentDidMount() {
    const form = document.getElementById("register-form");
    form.addEventListener("submit", registerUser);
    async function registerUser(event) {
      event.preventDefault();
      const fullName = document.getElementById("fullName").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const passwordTwo = document.getElementById("passwordTwo").value;
      const email = document.getElementById("email").value;

      const message = document.getElementById("register__message");

      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          passwordTwo,
          email,
        }),
      }).then((res) => res.json());

      if (result.status === "ok") {
        message.innerHTML = "Success!";
      } else {
        message.innerHTML = result.error + " !";
      }
    }
  }
  render() {
    return (
      <div className="register">
        <div className="register__container">
          <form id="register-form">
            <h1 id="register__message"></h1>
            <div className="register__control">
              <input
                type="text"
                name="fullname"
                id="fullName"
                placeholder="full name"
                className="register__textInput"
                required
              />
            </div>
            <div className="register__control">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="register__textInput"
                required
              />
            </div>
            <div className="register__control">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                className="register__textInput"
                required
              />
            </div>
            <div className="register__control">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="register__textInput"
                required
              />
            </div>
            <div className="register__control">
              <input
                type="password"
                name="passwordTwo"
                id="passwordTwo"
                placeholder="confirm password"
                className="register__textInput"
                required
              />
            </div>
            <div className="register__control">
              <input type="submit" value="Register" className="register__btnInput btn" required />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
