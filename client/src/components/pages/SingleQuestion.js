import React, { Component } from "react";
import { Link } from "@reach/router";
import LikeDislikes from './LikeDislikes.js'; 

import "../../css/SingleQuestion.css";

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="singleQuestion">
        <a href={this.props.url}>
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
          </a>
          <div className="singleQuestion__container">
          <LikeDislikes question questionId={this.props.questionId} userId={this.props.userId}/>
          </div>
      </div>
    );
  }
}

export default SingleQuestion;
