import React, { Component, useState } from "react";
import axios from "axios";

import "../../css/ChangePassword.css";

class EmailPasswordLink extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    // console.log("reset password link form submitted successfully!");

    const changeMessage = document.getElementById("changePassword__message");

    const email = {
      email: this.email,
    };

    axios.post("/api/email-password-link", email).then((res) => {
      console.log(res.data.status);
      if (res.data.status === "ok") {
        changeMessage.innerHTML =
          "An email with the reset link has been sent. Please check your inbox!";
      } else {
        changeMessage.innerHTML = "No user was found with this email.";
      }
    });
  };

  render() {
    return (
      <div className="change">
        <div className="change__container">
          <form id="change-form" onSubmit={this.onSubmit}>
            <h1 id="changePassword__message"></h1>
            <h5>Please enter your email to recieve link to reset password!</h5>
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
