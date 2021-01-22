import React, { Component } from "react";
import { Link } from "@reach/router";
import LikeDislikes from "./LikeDislikes.js";
import ReactHtmlParser from "react-html-parser";
import ReactTimeAgo from "react-time-ago";
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
            <h5>{this.props.username}</h5>
            <h5>Subject: {this.props.subject}</h5>
          </div>
          <div className="singleQuestion__container">
            <span className="singleQuestion__tag">Tag: </span>
            <ul id="tags">
              {this.props.tag.map((tag) => (
                <li className="tag">
                  <span className="tag-title">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            Posted at: <ReactTimeAgo date={this.props.timestamp} locale="en-US" timeStyle="round" />
          </div>
          <div className="singleQuestion__container">
            <p>
              <span>Question:</span>
              <div className="reactHtmlParser__container">
                {ReactHtmlParser(this.props.question)}
              </div>
            </p>
          </div>
        </a>
        <div className="singleQuestion__container">
          <LikeDislikes question questionId={this.props.questionId} userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default SingleQuestion;
