import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../css/Header.css";
const link_style = {
  textDecoration: 'inherit',
  color: 'inherit'
}

class Header extends Component {
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
          <button className='btn'> 
            <Link to='/login' style={link_style}><span>Login</span></Link> 
          </button> 
          <button className="btn"> 
            <Link to='/register' style={link_style}><span>Register</span></Link> 
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
