import React, { Component } from "react";

import SingleQuestion from "../pages/SingleQuestion.js";
import SearchBar from "./SearchBar.js";
import Background from "./Background.js";

import "../../css/Questions.css";
import { post } from "../../utilities";

import "../../css/SearchResults.css";
let arr = undefined; 
class SearchResults extends Component {
  constructor(props) {
    super(props);
    if (props.query.charAt(0) === "[" && props.query.charAt(props.query.length - 1) === "]") {
      let res = props.query.slice(1, props.query.length - 1); 
      let res2 = res.split(","); 
      arr = [];
      for (let i=0; i<res2.length; i++){
        let result = undefined; 
        if(res2[i].charAt(0)==="+"){
          result = res2[i].slice(1, res2[i].length); 
        }
        else {
          result = res2[i]; 
        }
        arr.push(result); 
      }
      console.log(arr); 
    } else {
      arr = props.query.split("+").join(" ");
    }
    this.state = {
      questions: [],
      query: arr,
    };
  }

  componentDidMount() {
    if (this.props.query.charAt(0) === "[" && this.props.query.charAt(this.props.query.length - 1) === "]") {
      console.log(this.state.query); 
      post("/api/searchtags", { query: this.state.query }).then((questionObjs)=>{
        let reversedObjs = questionObjs.reverse();
        this.setState({
          questions: reversedObjs,
        });
      })
    }
    else{
    post("/api/search", { query: this.state.query }).then((questionObjs) => {
      let reversedObjs = questionObjs.reverse();
      this.setState({
        questions: reversedObjs,
      });
    });
  }
  }

  render() {
    let questionsList = null;
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        return (
          //<a href={`/questions/${questionObj._id}`}>

          <SingleQuestion
            writerId={questionObj.writer._id}
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
