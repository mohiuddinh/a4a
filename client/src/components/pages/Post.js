import React, { Component } from "react";

import "../../css/Post.css";
import { post } from '../../utilities';
import { Link, Redirect } from 'react-router-dom'; 
import SinglePostPage from '../pages/SinglePostPage';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";



class Post extends Component {
  constructor(props){
    super(props); 
    this.state = {
      subject: '', 
      tag: '', 
      question: '',
      redirect: false
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const { subject, tag, question, redirect } = this.state;
    this.setState({redirect: true});  
    post('/api/post', { subject, tag, question } ).then((res) => {
      console.log('form submitted'); 
      console.log(res)
      this.props.history.push(`/questions/${res._id}`);
    })
    
  }
  
  render() {
    const { subject, tag, question, redirect } = this.state;
    
    return (
      <div className="post">
        <div className="post__container">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="post__textInput"
              value={subject}
              onChange={this.onChange}
              required
            />
            <input type="text" name="tag" placeholder="Tags" className="post__textInput" value={tag} onChange={this.onChange} required />
            <textarea
              name="question"
              id="post__questionField"
              cols="30"
              rows="10"
              placeholder="Question"
              value={question}
              onChange={this.onChange}
              required
            ></textarea>
            <div className="post__selection">
              <input type="reset" value="Discard" className="post__btnInput btn" required />
              <input type="submit" value="Submit" className="post__btnInput btn" required />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);
