import React, { Component } from "react";

import "../../css/Register.css";

class Register extends Component {
  render() {
    return (
      <div className="register">
        <div className="register__container">
          <form action="" method="POST">
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
