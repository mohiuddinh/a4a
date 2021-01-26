import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import SingleQuestion from "./SingleQuestion.js";

import "../../css/EECS.css";
import Background from "./Background.js";

class EECS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const data = {
      group: 6,
    };
    axios.post("/api/department", data).then((res) => {
      const questionObjs = res.data.questions;
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
            tagColor={"#ffa812"}
            tagFontColor={"white"}
            key={questionObj._id}
            questionId={questionObj._id}
            subject={questionObj.subject}
            writerId={questionObj.writer._id}
            tag={questionObj.tag}
            question={questionObj.question}
            username={questionObj.writer.username}
            userId={this.props.userId}
            url={`/questions/${questionObj._id}`}
            timestamp={questionObj.createdAt}
            parentFile="eecs"
          />
          //</a>
        );
      });
    } else {
      questionsList = (
        <div className="loader loader_eecs">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
        </div>
      );
    }

    return (
      <div className="questions">
        <Background color={"ffa812"} />
        <div className="questions__main animate__animated animate__fadeIn">
          <div className="page_title EECS_title animate__animated animate__slideInUp">
            Electrical Engineering and Computer Science
          </div>
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default EECS;
