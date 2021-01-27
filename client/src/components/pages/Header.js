import React, { Component } from "react";
import { Link } from "@reach/router";
import cs from "classnames";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import MediaQuery from "react-responsive";

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
    // header navbar animation on mobile from https://stackoverflow.com/questions/65888080/reactjs-how-to-apply-transitions-to-inline-stylings-in-react/65888897?noredirect=1#comment116499569_65888897
    const btnClassname = cs("btn", {
      closeBtn: !this.state.showMenu,
      openBtn: this.state.showMenu,
    });
    const spanClassname = cs({
      closeSpan: !this.state.showMenu,
      openSpan: this.state.showMenu,
    });

    return (
      <div className="header__sticky">
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
              <a className="header__titleMobile">
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
                    stroke="black"
                  />
                  <path
                    d="M40.5976 29.72V20.84L54.9016 0.440002H66.3736V20.504H69.8296V29.72H66.3736V35H55.6216V29.72H40.5976ZM56.4856 12.584L51.3016 20.504H56.4856V12.584Z"
                    strokeWidth="1"
                    stroke="black"
                  />
                  <path
                    d="M96.0904 29.864H84.7624L83.0824 35H71.8984L84.3304 1.016H96.6184L109.002 35H97.7704L96.0904 29.864ZM93.4984 21.848L90.4264 12.392L87.3544 21.848H93.4984Z"
                    strokeWidth="1"
                    stroke="black"
                  />
                </svg>
              </a>
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
          {/* {this.state.showMenu ? ( */}
          <div
            className={cs("header__menu", {
              close: !this.state.showMenu,
              open: this.state.showMenu,
            })}
            // style={this.showMenu ? null : { transform: "translateX(100%)" }}
          >
            {this.props.userId ? (
              <Link to="/post" style={link_style}>
                <button className={btnClassname}>
                  <span className={spanClassname}>Post</span>
                </button>
              </Link>
            ) : null}
            {!this.props.userId ? (
              <Link to="/login" style={link_style}>
                <button className={btnClassname}>
                  <span className={spanClassname}>Login</span>
                </button>
              </Link>
            ) : null}
            {this.props.userId ? (
              <Link to={`/profile/${this.props.userId}`} style={link_style}>
                <button className={btnClassname}>
                  <span className={spanClassname}>Profile</span>
                </button>
              </Link>
            ) : null}
            {this.props.userId ? (
              <button className={btnClassname} onClick={this.props.handleLogout}>
                <span className={spanClassname}>Logout</span>
              </button>
            ) : (
              <Link to="/register" style={link_style}>
                <button className={btnClassname}>
                  <span className={spanClassname}>Register</span>
                </button>
              </Link>
            )}
          </div>
          {/* // ) : null} */}
        </div>
      </div>
    );
  }
}

export default Header;
