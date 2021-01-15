import React, { Component } from "react";
import axios from "axios";

import "../../css/Register.css";

class Register extends Component {
  onSubmit = (e) => {
    e.preventDefault();

    console.log("form was submitted");

    const registerMessage = document.getElementById("register__message");

    const registered = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      passwordTwo: this.passwordTwo,
    };

    console.log(registered);

    axios.post("/api/register", registered).then((res) => {
      if (res.data.status === "ok") {
        registerMessage.innerHTML = "Success!";
      } else {
        registerMessage.innerHTML = res.data.error;
      }
    });
  };

  render() {
    return (
      <div className="register">
        <div className="register__container">
          <form onSubmit={this.onSubmit}>
            <h1 id="register__message"></h1>
            <div className="register__control">
              <input
                type="text"
                name="fullname"
                placeholder="full name"
                className="register__textInput"
                required
                onChange={(e) => (this.fullName = e.target.value)}
              />
            </div>
            <div className="register__control">
              <input
                type="text"
                name="username"
                placeholder="username"
                className="register__textInput"
                required
                onChange={(e) => (this.username = e.target.value)}
              />
            </div>
            <div className="register__control">
              <input
                type="email"
                name="email"
                placeholder="email"
                className="register__textInput"
                required
                onChange={(e) => (this.email = e.target.value)}
              />
            </div>
            <div className="register__control">
              <input
                type="password"
                name="password"
                placeholder="password"
                className="register__textInput"
                required
                onChange={(e) => (this.password = e.target.value)}
              />
            </div>
            <div className="register__control">
              <input
                type="password"
                name="passwordTwo"
                placeholder="confirm password"
                className="register__textInput"
                required
                onChange={(e) => (this.passwordTwo = e.target.value)}
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
