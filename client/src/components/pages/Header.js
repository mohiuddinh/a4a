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
      console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
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
            <svg
              width="110"
              height="50"
              viewBox="0 0 110 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="logo"
            >
              <path
                d="M25.1686 29.864H13.8406L12.1606 35H0.976562L13.4086 1.016H25.6966L38.0806 35H26.8486L25.1686 29.864ZM22.5766 21.848L19.5046 12.392L16.4326 21.848H22.5766Z"
                strokeWidth="1"
                stroke="#a31f34"
              />
              <path
                d="M40.5976 29.72V20.84L54.9016 0.440002H66.3736V20.504H69.8296V29.72H66.3736V35H55.6216V29.72H40.5976ZM56.4856 12.584L51.3016 20.504H56.4856V12.584Z"
                strokeWidth="1"
                stroke="#a31f34"
              />
              <path
                d="M96.0904 29.864H84.7624L83.0824 35H71.8984L84.3304 1.016H96.6184L109.002 35H97.7704L96.0904 29.864ZM93.4984 21.848L90.4264 12.392L87.3544 21.848H93.4984Z"
                strokeWidth="1"
                stroke="#a31f34"
              />
            </svg>
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
      </div>
    );
  }
}

export default Header;
