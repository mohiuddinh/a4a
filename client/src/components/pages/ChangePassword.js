import React, { Component } from "react";

import "../../css/ChangePassword.css";

class ChangePassword extends Component {
  componentDidMount() {
    const form = document.getElementById("change-form");
    form.addEventListener("submit", changePassword);

    async function changePassword(event) {
      event.preventDefault();
      const password = document.getElementById("password").value;

      const result = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newpassword: password,
          token: localStorage.getItem("token"),
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
      <div className="change">
        <div className="change__container">
          <form id="change-form">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="new password"
              className="change__textInput"
              required
            />
            <input type="submit" value="Submit" className="change__btnInput btn" required />
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
