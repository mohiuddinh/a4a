import React, { Component } from "react";
import "../../css/Header.css";
import {Link} from 'react-router-dom'; 

const link_style = {
  textDecoration: 'none'
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header__selection">
          <h5>Questions</h5>
          <h5>Post</h5>
        </div>
        <div className="header__title">
          <h1>MIT Ask</h1>
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
