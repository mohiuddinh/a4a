import React, { Component } from "react";
import { Link } from "@reach/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import "../../css/Header.css";
import { get, post } from "../../utilities";

const GOOGLE_CLIENT_ID = "1093512085888-qcun701nmlf6j0pdohdqs37laptbm1a6.apps.googleusercontent.com";

const link_style = {
  textDecoration: "inherit",
  color: "inherit",
};

class Header extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      loggedIn: false
    }; 
  }

  handleLogin = (res) => {
    console.log('Logged in'); 
    this.setState({ loggedIn: true });

    const userToken = res.tokenObj.id_token;
    post('/api/login', { token: userToken }).then((user) => {
      console.log(user);
    }); 

  }; 

  handleLogout = (res) => { 
    this.setState({ loggedIn: false })
    post('/api/logout').then(()=>{
      console.log('Logged out')
    }); 
  }; 

  render() {
    return (
      <div className="header">
        <div className="header__selection">
          <h5>
            <Link to="/questions" style={link_style}>
              Questions
            </Link>
          </h5>
          <h5>
            <Link to="/post" style={link_style}>
              Post
            </Link>
          </h5>
        </div>
        <div className="header__title">
          <h1>
            <Link to="/" style={link_style}>
              MIT Ask
            </Link>
          </h1>
        </div>
        <div className="header__user">
          <button className="btn">
            <Link to="/login" style={link_style}>
              <span>Login</span>
            </Link>
          </button>
          <button className="btn">
            <Link to="/register" style={link_style}>
              <span>Register</span>
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
