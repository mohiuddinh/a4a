import React, { Component } from "react";

import SingleQuestion from "../pages/SingleQuestion.js";
import Home from './Home.js'; 
import "../../css/Questions.css";
import { post } from "../../utilities";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      query: props.query.split("+").join(" "),
    };
  }

  componentDidMount() {
    //console.log(this.state.query);
    post("/api/search", { query: this.state.query }).then((questionObjs) => {
      //console.log(questionObjs);
      let reversedObjs = questionObjs.reverse();
      this.setState({
        questions: reversedObjs,
      });
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
        <div className="questions__main">
          {/* <form id="search-bar">
            <input
              type="text"
              placeholder="Search..."
              id="search"
              value={this.state.search}
              onChange={this.onChange}
            />
          </form> */}
          <Home />
          <div>{questionsList.length} results</div>
          {questionsList}
        </div>
      </div>
    );
  }
}

export default SearchResults;

