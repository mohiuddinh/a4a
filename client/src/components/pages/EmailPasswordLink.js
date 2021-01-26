import React, { Component, useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";

import "../../css/ChangePassword.css";
import "animate.css/animate.min.css";
import Background from "./Background";

class EmailPasswordLink extends Component {
  onSubmit = (e) => {
    e.preventDefault();

    const changeMessage = document.getElementById("changePassword__message");

    const email = {
      email: this.email,
    };

    axios.post("/api/email-password-link", email).then((res) => {
      console.log(res.data.status);
      if (res.data.status === "ok") {
        store.addNotification({
          title: "Success!",
          message: "An email with the reset link has been sent. Please check your inbox!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"],
          animationOut: ["animate__animated animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      } else {
        store.addNotification({
          title: "Uh oh",
          message: "No user was found with this email.",
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
      <div className="change">
        <Background color={"525252"} />
        <div className="change__container">
          <form id="change-form" onSubmit={this.onSubmit}>
            <h5>Please enter your email to recieve link to reset password.</h5>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="change__textInput"
              required
              onChange={(e) => (this.email = e.target.value)}
            />
            <input type="submit" value="Submit" className="change__btnInput btn" required />
          </form>
        </div>
      </div>
    );
  }
}

export default EmailPasswordLink;
