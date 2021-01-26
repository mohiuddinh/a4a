import React, { Component } from "react";

import SingleQuestion from "../pages/SingleQuestion.js";
import SearchBar from "./SearchBar.js";
import Background from "./Background.js";

import "../../css/Questions.css";
import { post } from "../../utilities";

import "../../css/SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      query: props.query.split("+").join(" "),
    };
  }

  componentDidMount() {
    post("/api/search", { query: this.state.query }).then((questionObjs) => {
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
            tagColor={"#caf4f4"}
            tagFontColor={"black"}
            parentFile={"all"}
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
        <div className="questions__main">
          {/* <form id="search-bar"> */}
          {/* <input
              type="text"
              placeholder="Search..."
              id="search"
              value={this.state.search}
              onChange={this.onChange}
            />
          </form> */}
          <SearchBar url="searchtwo" />
          <div className="searchResult">{questionsList.length} results</div>
          {questionsList}
          {/* </form> */}
        </div>
      </div>
    );
  }
}

export default SearchResults;
