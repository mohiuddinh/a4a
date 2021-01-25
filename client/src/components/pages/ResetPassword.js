import React, { useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";

import "animate.css/animate.min.css";
import Background from "./Background";

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [resetPasswordMessage, setResetPasswordMessage] = useState("");
  const token = props.token;

  async function fetchData(jsonData) {
    await axios.post(`/api/reset-password/${token}`, jsonData).then((res) => {
      if (res.data.status === "tokenExpired") {
        // setResetPasswordMessage(
        //   "Your link has expired. Please navigate back to forgot password to receive a new link"
        // );
        store.addNotification({
          title: "Uh oh",
          message:
            "Your link has expired. Please navigate back to forgot password to receive a new link.",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      } else if (res.data.status === "success") {
        // setResetPasswordMessage(
        //   "You have successfully reset your password! Try logging in again now!"
        // );
        store.addNotification({
          title: "Success!",
          message: "You have successfully reset your password! Try logging in again now!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      } else if (res.data.status === "error") {
        // setResetPasswordMessage(res.data.error + "!");
        store.addNotification({
          title: "Uh oh",
          message: res.data.error + "!",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
          animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
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
      <Background color={"525252"} />
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
