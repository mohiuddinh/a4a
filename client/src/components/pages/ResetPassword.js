import React, { useState } from "react";
import axios from "axios";

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const token = props.token;

  async function fetchData(jsonData) {
    await axios.post(`/api/reset-password/${token}`, jsonData).then((res) => {
      if (res.data.status === "tokenExpired") {
        setResetPasswordMessage(
          "Your link has expired. Please navigate back to forgot password to receive a new link"
        );
      } else if (res.data.status === "success") {
        setResetPasswordMessage(
          "You have successfully reset your password! Trying logging in again now!"
        );
      } else if (res.data.status === "error") {
        setResetPasswordMessage(res.data.error + "!");
      }
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const resetPassword = {
      password: password,
      passwordTwo: passwordTwo,
    };

    fetchData(resetPassword);
    // console.log("fetched successfully!");
  };

  return (
    <div className="change">
      <div className="change__container">
        <form onSubmit={onSubmit}>
          <h1 id="changePassword__message">{resetPasswordMessage}</h1>
          <input
            type="password"
            name="password"
            placeholder="new password"
            className="change__textInput"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="passwordTwo"
            placeholder="confirm new password"
            className="change__textInput"
            required
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
          />
          <input type="submit" value="Submit" className="change__btnInput btn" required />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
