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

  // handleLogin = (res) => {
  //   console.log("Logged in");
  //   this.setState({ loggedIn: true });

  //   const userToken = res.tokenObj.id_token;
  //   post("/api/login", { token: userToken }).then((user) => {
  //     console.log(user);
  //   });
  // };

  // handleLogout = () => {
  //   this.setState({ loggedIn: false });
  //   post("/api/logout").then((res) => {
  //     console.log("Logged out");
  //   });
  // };

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
          {/* <h5>
            <Link to="/questions" style={link_style}>
              Questions
            </Link>
          </h5> */}
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
              width="195"
              height="37"
              viewBox="0 0 195 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="logo"
            >
              <path
                d="M41.1386 2.01601V36H30.5306V19.056L25.2987 36H16.1786L10.9466 19.056V36H0.290649V2.01601H13.3466L20.8346 22.416L28.1307 2.01601H41.1386Z"
                stroke="black"
                stroke-width="1"
              />
              <path
                d="M56.6029 2.01601V36H45.9469V2.01601H56.6029Z"
                stroke="black"
                stroke-width="1"
              />
              <path
                d="M88.1036 2.01601V10.464H79.0797V36H68.4236V10.464H59.4957V2.01601H88.1036Z"
                stroke="black"
                stroke-width="1"
              />
              <path
                d="M120.942 30.864H109.614L107.934 36H96.75L109.182 2.01601H121.47L133.854 36H122.622L120.942 30.864ZM118.35 22.848L115.278 13.392L112.206 22.848H118.35Z"
                stroke="black"
                stroke-width="1"
              />
              <path
                d="M148.323 36.336C145.763 36.336 143.491 35.92 141.507 35.088C139.555 34.256 138.003 33.104 136.851 31.632C135.699 30.16 135.043 28.496 134.883 26.64H145.107C145.235 27.44 145.571 28.032 146.115 28.416C146.691 28.8 147.411 28.992 148.275 28.992C148.819 28.992 149.251 28.88 149.571 28.656C149.891 28.4 150.051 28.096 150.051 27.744C150.051 27.136 149.715 26.704 149.043 26.448C148.371 26.192 147.235 25.904 145.635 25.584C143.683 25.2 142.067 24.784 140.787 24.336C139.539 23.888 138.435 23.12 137.475 22.032C136.547 20.944 136.083 19.44 136.083 17.52C136.083 15.856 136.515 14.352 137.379 13.008C138.275 11.632 139.587 10.56 141.315 9.79201C143.043 8.99201 145.139 8.59201 147.603 8.59201C151.251 8.59201 154.099 9.48801 156.147 11.28C158.227 13.072 159.475 15.408 159.891 18.288H150.435C150.275 17.552 149.939 16.992 149.427 16.608C148.915 16.192 148.227 15.984 147.363 15.984C146.819 15.984 146.403 16.096 146.115 16.32C145.827 16.512 145.683 16.816 145.683 17.232C145.683 17.776 146.019 18.192 146.691 18.48C147.363 18.736 148.435 19.008 149.907 19.296C151.859 19.68 153.507 20.112 154.851 20.592C156.195 21.072 157.363 21.904 158.355 23.088C159.347 24.24 159.843 25.84 159.843 27.888C159.843 29.488 159.379 30.928 158.451 32.208C157.523 33.488 156.179 34.496 154.419 35.232C152.691 35.968 150.659 36.336 148.323 36.336Z"
                stroke="black"
                stroke-width="1"
              />
              <path
                d="M181.4 36L174.728 25.2V36H164.072V0.480011H174.728V19.056L181.496 8.92801H193.88L183.752 22.56L194.12 36H181.4Z"
                stroke="black"
                stroke-width="1"
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
