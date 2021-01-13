import React, { Component } from "react";

import "../../css/Register.css";

class Register extends Component {
  componentDidMount() {
    const form = document.getElementById("register-form");
    form.addEventListener("submit", registerUser);
    async function registerUser(event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const result = await fetch("/api/register", {
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
        alert("Success!");
      } else {
        alert(result.error);
      }
    }
  }
  render() {
    return (
      <div className="register">
        <div className="register__container">
          <form id="register-form">
            <div className="register__nameContainer">
              <input
                type="text"
                name="firstname"
                placeholder="first name"
                className="register__textInput"
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="last name"
                className="register__textInput"
                required
              />
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="register__textInput"
              required
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              className="register__textInput"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="register__textInput"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="confirm password"
              className="register__textInput"
              required
            />
            <input type="submit" value="Register" className="register__btnInput btn" required />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
