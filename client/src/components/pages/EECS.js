import React, { Component } from "react";
import axios from "axios";

import SingleQuestion from "./SingleQuestion.js";

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
            userId={this.props.userId}
            url={`/questions/${questionObj._id}`}
          />
          //</a>
        );
      });
      console.log({ questionsList });
    } else {
      questionsList = <div>Loading...</div>;
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

export default EECS;
