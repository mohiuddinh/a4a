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
      search: ''
    };
  }


  /* onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const { search } = this.state.search;
    console.log(search);
    post('/api/search', { search } ).then((questionObjs) => {
      let reversedObjs = questionObjs.reverse();
      this.setState({ questions: reversedObjs });
      console.log(questionObjs);
      //question.fuzzySearch('weenie').then(console.log).catch(console.error);
    });  

  }   */
  
  componentDidMount() {
    const form = document.getElementById("search-bar");
    form.addEventListener("submit", searchQuestions);

    


    function searchQuestions(event) {
      event.preventDefault();
      const search = document.getElementById("search").value;

      let sendData = () => {
      axios.post("/api/search", search)
      .then(res => console.log('Data send'))
      .catch(err => console.log(err.data))
      }

      console.log(search);
      get("/api/post").then((questionObjs) => {
        let reversedObjs = questionObjs.reverse();
        this.setState({ questions: reversedObjs });
        console.log(questionObjs);
        //question.fuzzySearch('weenie').then(console.log).catch(console.error);
      }); 
    }


 /*    const onChange = (event) => {
      get("/api/hello").then((questionObjs) => {
        let reversedObjs = questionObjs.reverse();
        this.setState({ questions: reversedObjs });
        console.log(questionObjs);
        //question.fuzzySearch('weenie').then(console.log).catch(console.error);
      });
    }


    handleSubmit = (e) => {
      e.preventDefault(); 
      const { search } = this.state;
      get('/api/post', { search } ).then((res) => {
      console.log('search complete');
      window.location.reload()
      });
    } 
 */

 /*      get("/api/post").then((questionObjs) => {
      let reversedObjs = questionObjs.reverse();
      this.setState({ questions: reversedObjs });
      console.log(questionObjs);
      //question.fuzzySearch('weenie').then(console.log).catch(console.error);
    });  */
  } 
 

  render() {
    const { question, search } = this.state;

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
          <form id="search-bar" onSubmit={this.handleSubmit}>
            <input 
            type="text" 
            placeholder="Search..." 
            id="search"
            onChange={this.onChange} />
            {questionsList}
          </form>
        </div>
      </div>
    );
  }
}

export default Questions;
