import React, { Component } from "react";
import { Link } from "@reach/router";


class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>Subject: {this.props.subject}</span>
        <p>Tag: {this.props.tag}</p>
        <p>Question: {this.props.question}</p>
        <hr></hr>
      </div>
    );
  }
}

export default SingleQuestion;