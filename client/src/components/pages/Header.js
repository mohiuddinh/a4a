import React, { Component } from "react";
import { Link } from "@reach/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import Dropdown from "./Dropdown.js";

import "../../css/Header.css";
import { get, post } from "../../utilities";

const GOOGLE_CLIENT_ID =
  "1093512085888-qcun701nmlf6j0pdohdqs37laptbm1a6.apps.googleusercontent.com";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    const logo = document.querySelectorAll("#logo path");

    for (let i = 0; i < logo.length; i++) {
      // console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header__selection">
          <Dropdown />
          {this.props.userId ? (
            <h5>
              <Link to="/post" style={link_style}>
                Post
              </Link>
            </h5>
          ) : null}
        </div>
        <div className="header__title">
          <Link to="/" style={link_style}>
            <a aria-label="Thanks" class="h-button centered" data-text="A4A" href="#">
              <span>A</span>
              <span>s</span>
              <span>k</span>
              <span>4</span>
              <span>A</span>
              <span>n</span>
              <span>s</span>
              <span>w</span>
              <span>e</span>
              <span>r</span>
            </a>
          </Link>
        </div>
        <div className="header__user">
          {!this.props.userId ? (
            <Link to="/login" style={link_style}>
              <button className="btn">
                <span>Login</span>
              </button>
            </Link>
          ) : null}
          {this.props.userId ? (
            <Link to={`/profile/${this.props.userId}`} style={link_style}>
              <button className="btn">
                <span>Profile</span>
              </button>
            </Link>
          ) : null}
          {this.props.userId ? (
            <button className="btn btn-logout" onClick={this.props.handleLogout}>
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/register" style={link_style}>
              <button className="btn">
                <span>Register</span>
              </button>
            </Link>
          )}
        </div>
        <div className="header__burger">
          <div className="burger-1"></div>
          <div className="burger-2"></div>
          <div className="burger-3"></div>
        </div>
      </div>
    );
  }
}

export default Header;
