import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import Background from "./Background.js";

import SingleQuestion from "../pages/SingleQuestion.js";

import "../../css/Questions.css";
import { get } from "../../utilities";

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
      //console.log("received questions");
    });
  }

  render() {
    let questionsList = null;
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        return (
          //<a href={`/questions/${questionObj._id}`}>

          <SingleQuestion
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
        <div>Loading...</div>
      );
    }

    return (
      <div className="questions">
        <Background color={"525252"} />
        <div className="questions__main">
          {/* <div classname="department_title">
            <p> ECONOMICS </p>
          </div> */}
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Questions;
