import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import axios from "axios";
import { store } from "react-notifications-component";

import "../../css/Login.css";
import "animate.css/animate.min.css";
import Background from "./Background";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const loginMessage = document.getElementById("login__message");

    const login = {
      username: this.username,
      password: this.password,
    };

    axios.post("/api/login", login).then((res) => {
      localStorage.setItem("token", res.token);
      if (res.data.status === "ok") {
        this.props.liftStateUp(res.data.userInfo.id);
        navigate("/");
      } else {
        store.addNotification({
          title: "Uh oh",
          message: res.data.error,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }
    });
  };

  render() {
    return (
      <div className="login">
        <Background color={"525252"} />
        <div className="login__container">
          <form id="login-form" onSubmit={this.onSubmit}>
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
              <input type="submit" value="Login" className="login__btnInput btn btn-hoverDarkGreen" required />
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
