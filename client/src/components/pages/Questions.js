import React, { Component } from "react";

import "../../css/Questions.css";

class Questions extends Component {
  render() {
    return (
      <div className="questions">
        <div className="questions__sidebar"></div>
        <div className="questions__main">
          <input type="text" placeholder="search..." />
          <div className="questions__mainContainer">
            <div className="questions__card"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
