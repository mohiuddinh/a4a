import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import SingleQuestion from "../pages/SingleQuestion.js";

import "../../css/Questions.css";
import { get } from "../../utilities";

const axios = require('axios');

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      search: ''
    };
  }

  componentDidMount() {
    get("/api/post").then((questionObjs) => {
      let reversedObjs = questionObjs.reverse();
      this.setState({ questions: reversedObjs });
      //console.log("received questions");
    });
    get('/api/whoami').then((res)=>{console.log(res)});
  }

  onChange = (e) => {
    this.setState({ search: e.target.value });
    //console.log(this.state.search);
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const search = { search: this.state.search };
    console.log(search);
    axios.post('/api/search', search).then(res => {
     // let reversedObjs = questionObjs.reverse();
      //this.setState({ questions: res });
      console.log(res.data);
    });

  }   
  
//   componentDidMount() {
// /*     function searchQuestions(event) {
//       event.preventDefault();
//       //console.log(search);
//       get("/api/post").then((questionObjs) => {
//         let reversedObjs = questionObjs.reverse();
//         this.setState({ questions: reversedObjs });
//         console.log(questionObjs);
//       }); 
//     }; */

//   }

  render() {
    const { question, search } = this.state;

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
          <form id="search-bar" onSubmit={this.handleSubmit}>
            <input 
            type="text" 
            placeholder="Search..." 
            id="search"
            value={this.state.search}
            onChange={this.onChange} />
            {questionsList}
          </form>
        </div>
      </div>
    );
  }
}

export default Questions;
