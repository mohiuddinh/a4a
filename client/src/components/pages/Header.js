import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const GOOGLE_CLIENT_ID = "511644259879-2e1oqgimrisb5q4dnj07l8h1p08rgico.apps.googleusercontent.com";


import "../../css/Header.css";
const link_style = {
  textDecoration: 'inherit',
  color: 'inherit'
}

class Header extends Component {

  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="header">
        <div className="header__selection">
          <h5> 
            <Link to="/skeleton" style={link_style}>
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
          {this.props.userId ? (
            <GoogleLogout
                className = "googleButton"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
              />
            ) : (
            <GoogleLogin
              className = "googleButton"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign In"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              variant="contained"
              uxMode="popup"
              cookiePolicy={'single_host_origin'}
            />
          )}
         {/*  <button className='btn'> 
            <Link to='/skeleton' style={link_style}><span>Login</span></Link> 
          </button>  */}
          {/* <button className="btn"> 
            <Link to='/register' style={link_style}><span>Register</span></Link> 
          </button> */}
        </div>
      </div>
    );
  }
}

export default Header;
