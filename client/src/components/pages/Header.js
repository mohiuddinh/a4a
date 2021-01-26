import React, { Component } from "react";
import { Link } from "@reach/router";
import cs from "classnames";
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
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  render() {
    const classnames = cs("header__menu", {
      open: this.showMenu,
      close: !this.showMenu,
    });

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
            <a aria-label="Thanks" className="h-button centered" data-text="A4A" href="#">
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
              <button className="btn btn-hoverUp">
                <span>Login</span>
              </button>
            </Link>
          ) : null}
          {this.props.userId ? (
            <Link to={`/profile/${this.props.userId}`} style={link_style}>
              <button className="btn btn-hoverUp">
                <span>Profile</span>
              </button>
            </Link>
          ) : null}
          {this.props.userId ? (
            <button className="btn btn-hoverUp" onClick={this.props.handleLogout}>
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/register" style={link_style}>
              <button className="btn btn-hoverUp">
                <span>Register</span>
              </button>
            </Link>
          )}
        </div>
        <div className="header__burgerContainer">
          <div className="header__burger" onClick={this.showMenu}>
            <div
              className="burger-1"
              style={
                this.state.showMenu ? { transform: "rotate(-45deg) translate(-7px, 5px)" } : null
              }
            ></div>
            <div className="burger-2" style={this.state.showMenu ? { opacity: "0" } : null}></div>
            <div
              className="burger-3"
              style={
                this.state.showMenu ? { transform: "rotate(45deg) translate(-6px, -4px)" } : null
              }
            ></div>
          </div>
        </div>
        {/* menu for media query */}
        {this.state.showMenu ? (
          <div
            className="header__menu"
            style={this.showMenu ? null : { transform: "translateX(100%)" }}
          >
            {this.props.userId ? (
              <Link to="/post" style={link_style}>
                <button className="btn">
                  <span>Post</span>
                </button>
              </Link>
            ) : null}
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
              <button className="btn" onClick={this.props.handleLogout}>
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
        ) : null}
      </div>
    );
  }
}

export default Header;
