import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar.js";
import SingleQuestion from "./SingleQuestion.js";
import Background from "./Background.js";

class Social extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    const data = {
      group: "Social",
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
            tagColor={"#ffb8d1"}
            tagFontColor={"white"}
            key={questionObj._id}
            questionId={questionObj._id}
            subject={questionObj.subject}
            tag={questionObj.tag}
            question={questionObj.question}
            username={questionObj.writer.username}
            userId={this.props.userId}
            url={`/questions/${questionObj._id}`}
            writerId={questionObj.writer._id}
            timestamp={questionObj.createdAt}
            parentFile="social"
          />
          //</a>
        );
      });
    } else {
      questionsList = <div>Loading...</div>;
    }

    return (
      <div className="questions">
        <Background color={"FFB8D1"} />
        <div className="questions__main">
          <SearchBar url="search" />
          {questionsList}
        </div>
      </div>
    );
  }
}

export default Social;
