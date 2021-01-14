import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

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
      console.log("received questions");
    });
  }

  render() {
    let questionsList = null;
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        return (
          <a href={`/questions/${questionObj._id}`}>
            <SingleQuestion
              key={questionObj._id}
              subject={questionObj.subject}
              tag={questionObj.tag}
              question={questionObj.question}
            />
          </a>
        );
      });
      console.log({ questionsList });
    } else {
      questionsList = <div>No questions :(</div>;
    }

    return (
      <div className="questions">
        <div className="questions__main">
          <input type="text" placeholder="search..." />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Questions;
