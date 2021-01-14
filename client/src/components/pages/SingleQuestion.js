import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../css/SingleQuestion.css";

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="singleQuestion">
        <div className="singleQuestion__container">
          <h5>Subject: {this.props.subject}</h5>
        </div>
        <div className="singleQuestion__container">
          <span>Tag: </span>
          <i>{this.props.tag}</i>
        </div>
        <div className="singleQuestion__container">
          <p>
            <span>Question:</span> {this.props.question}
          </p>
        </div>
      </div>
    );
  }
}

export default SingleQuestion;
