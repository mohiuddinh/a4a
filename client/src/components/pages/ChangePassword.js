import React, { Component } from "react";
import axios from "axios";

import "../../css/ChangePassword.css";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: "",
      newPasswordTwo: "",
    };
    this.changeNewPassword = this.changeNewPassword.bind(this);
    this.changeNewPasswordTwo = this.changeNewPasswordTwo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeNewPassword(event) {
    this.setState({
      newPassword: event.target.value,
    });
  }

  changeNewPasswordTwo(event) {
    this.setState({
      newPasswordTwo: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const changePasswordMessage = document.getElementById("changePassword__message");

    const changePassword = {
      newPassword: this.state.newPassword,
      newPasswordTwo: this.state.newPasswordTwo,
      token: localStorage.getItem("token"),
    };

    console.log(changePassword.token);

    axios.post("/api/change-password", changePassword).then((res) => {
      console.log(res);
      if (res.data.status === "ok") {
        changePasswordMessage.innerHTML = "Password changed successfully!";
      } else {
        changePasswordMessage.innerHTML = res.data.error + "!";
      }
    });
  }

  // componentDidMount() {
  //   const form = document.getElementById("change-form");
  //   form.addEventListener("submit", changePassword);

  //   async function changePassword(event) {
  //     event.preventDefault();
  //     const password = document.getElementById("password").value;

  //     const result = await fetch("/api/change-password", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         newpassword: password,
  //         token: localStorage.getItem("token"),
  //       }),
  //     }).then((res) => res.json());

  //     if (result.status === "ok") {
  //       alert("Success!");
  //     } else {
  //       alert(result.error);
  //     }
  //   }
  // }

  render() {
    return (
      <div className="change">
        <div className="change__container">
          <form id="change-form" onSubmit={this.onSubmit}>
            <h1 id="changePassword__message"></h1>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="new password"
              className="change__textInput"
              required
              onChange={this.changeNewPassword}
              value={this.state.newPassword}
            />
            <input
              type="password"
              name="password"
              id="passwordTwo"
              placeholder="confirm new password"
              className="change__textInput"
              required
              onChange={this.changeNewPasswordTwo}
              value={this.state.newPasswordTwo}
            />
            <input type="submit" value="Submit" className="change__btnInput btn" required />
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
