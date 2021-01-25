import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import SingleQuestion from "./SingleQuestion.js";

import "../../css/Math.css";
import Background from "./Background.js";

class Math extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const data = {
      group: 18,
    };
    axios.post("/api/department", data).then((res) => {
      const questionObjs = res.data.questions;
      //   console.log(res.data.questions);
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
          />
          //</a>
        );
      });
    } else {
      questionsList = <div>Loading...</div>;
    }

    return (
      <div className="questions">
        <Background color={"45b3e0"} />
        <div className="questions__main animate__animated animate__fadeIn">
          <div className="page_title Math_title animate__animated animate__slideInUp">
            Mathematics
          </div>
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Math;
