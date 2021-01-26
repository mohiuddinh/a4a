import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import SingleQuestion from "./SingleQuestion.js";
import Background from "./Background";

import "../../css/Chemistry.css";

class Chemistry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const data = {
      group: 5,
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
            tagColor={"#8441c2"}
            tagFontColor={"white"}
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
            parentFile="chemistry"
          />
          //</a>
        );
      });
    } else {
      questionsList = <div className = "loader loader_chemistry">
                      <div class="line line1"></div>
                      <div class="line line2"></div>
                      <div class="line line3"></div>
                      </div>;
    }

    return (
      <div className="questions">
        <Background color={"#8a2be2"} />
        <div className="questions__main animate__animated animate__fadeIn">
          <div className="page_title Chemistry_title animate__animated animate__slideInUp">
            Chemistry
          </div>
          {/* <input type="text" placeholder="search..." /> */}
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Chemistry;
