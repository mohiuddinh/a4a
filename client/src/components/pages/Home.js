import React, { Component } from "react";
import Header from './Header.js';
import "../../css/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <input type="text" placeholder="ask away!" />
      </div>
    );
  }
}

export default Home;
