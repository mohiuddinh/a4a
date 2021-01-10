import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../css/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__selection">
          <h5>Questions</h5>

          <h5>
            <Link to="/post" style={{ color: "inherit", textDecoration: "inherit" }}>
              Post
            </Link>
          </h5>
        </div>
        <div className="header__title">
          <h1>
            <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
              MIT Ask
            </Link>
          </h1>
        </div>
        <div className="header__user">
          <button className="btn">
            <span>Login</span>
          </button>
          <button className="btn">
            <span>Register</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
