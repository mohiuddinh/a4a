import React, { Component } from "react";
import SingleQuestion from '../pages/SingleQuestion.js'; 
import "../../css/Questions.css";
import { get } from "../../utilities";
import { Link } from 'react-router-dom'; 

class Questions extends Component {
  constructor(props){
    super(props); 
    this.state = {
      questions: []
    };
  }

  componentDidMount () {
    get('/api/post').then((questionObjs)=> {
      this.setState({ questions: questionObjs })
    }); 
  }
  
  render() {
    let questionsList = null; 
    if (this.state.questions.length !== 0) {
      questionsList = this.state.questions.map((questionObj, i) => {
        <SingleQuestion key={questionObj._id} subject={questionObj.subject} tag={questionObj.tag} question={questionObj.question}/> 
        console.log('done')
    })
    } else {
      questionsList = <div>No questions :(</div>
    }

    return (
      <div>{questionsList}</div>
    );
  }
}

export default Questions;
