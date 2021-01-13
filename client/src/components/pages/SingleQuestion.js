import React, { Component } from "react";
import { Link } from "@reach/router";


class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>{this.props.subject}</span>
        <p>{this.props.tag}</p>
        <p>{this.props.question}</p>
      </div>
    );
  }
}

export default SingleQuestion;