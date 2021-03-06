import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import Background from "./Background.js";

import SingleQuestion from "../pages/SingleQuestion.js";

import "../../css/Questions.css";
import { get } from "../../utilities";

//code citation (idea): staff code in catbook: https://github.com/weblab-workshops/catbook-react/blob/master/client/src/components/pages/Feed.js

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    get("/api/post").then((questionObjs) => {
      let reversedObjs = questionObjs.reverse();
      this.setState({ questions: reversedObjs });
    });
  }

  render() {
    let questionsList = null;
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        return (
          //<a href={`/questions/${questionObj._id}`}>

          <SingleQuestion
            tagColor={"#caf4f4"}
            tagFontColor={"black"}
            key={questionObj._id}
            questionId={questionObj._id}
            subject={questionObj.subject}
            tag={questionObj.tag}
            question={questionObj.question}
            username={questionObj.writer.username}
            writerId={questionObj.writer._id}
            userId={this.props.userId}
            url={`/questions/${questionObj._id}`}
            timestamp={questionObj.createdAt}
            parentFile="all"
          />
          //</a>
        );
      });
    } else {
      questionsList = (
        <div className="loader loader_general">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
      );
    }

    return (
      <div className="questions">
        <Background color={"525252"} />
        <div className="questions__main animate__animated animate__fadeIn">
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Questions;
