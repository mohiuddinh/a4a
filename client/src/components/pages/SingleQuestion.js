import React, { Component } from "react";
import { Link } from "@reach/router";
import LikeDislikes from "./LikeDislikes.js";
import ReactHtmlParser from "react-html-parser";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "react-timeago";
import "../../css/SingleQuestion.css";

class SingleQuestion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = "singleQuestion " + this.props.parentFile;
    const timestamp = new Date(this.props.timestamp);
    return (
      <div className={className}>
        {/* <a href={this.props.url}> */}
        <a href={this.props.url}>
          <div className="singleQuestion__container animate__animated animate__fadeIn">
            <span>
              <a href={`/profile/${this.props.writerId}`}>{this.props.username}: </a>
            </span>
            <h5>{this.props.subject}</h5>
          </div>
          {/* <a href={this.props.url}> */}
          <div className="singleQuestion__container">
            <span className="singleQuestion__tag">Tags:</span>
            <ul id="tags">
              {this.props.tag.map((tag, index) => (
                <li
                  className="tag"
                  key={index}
                  style={{ backgroundColor: this.props.tagColor, color: this.props.tagFontColor }}
                >
                  <span className="tag-title">{tag}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="singleQuestion__container">
            <span>Question:</span>
            <div className="reactHtmlParser__container">{ReactHtmlParser(this.props.question)}</div>
          </div>
        </a>
        <div className="singleQuestion__container">
          <LikeDislikes question questionId={this.props.questionId} userId={this.props.userId} />
          <div className="timeAgo">
            <TimeAgo date={timestamp} />
          </div>
        </div>
      </div>
    );
  }
}

export default SingleQuestion;
