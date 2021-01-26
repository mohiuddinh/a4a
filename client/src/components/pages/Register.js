import React, { Component } from "react";
import axios from "axios";
import { store } from "react-notifications-component";

import "../../css/Register.css";
import "animate.css/animate.min.css";
import Background from "./Background";

class Register extends Component {
  onSubmit = (e) => {
    e.preventDefault();

    const registered = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      passwordTwo: this.passwordTwo,
    };

    axios.post("/api/register", registered).then((res) => {
      if (res.data.status === "ok") {
        store.addNotification({
          title: "Success!",
          message: res.data.ok,
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2500,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Uh oh",
          message: res.data.error + "!",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2500,
            onScreen: true,
          },
        });
      }
    });
  };

  render() {
    return (
      <div className="register">
        <Background color={"525252"} />
        <div className="register__container">
          <form onSubmit={this.onSubmit}>
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
              <input
                type="submit"
                value="Register"
                className="register__btnInput btn btn-hoverDarkGreen"
                required
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
