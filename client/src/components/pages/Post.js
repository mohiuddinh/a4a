import React, { Component } from "react";

import "../../css/Post.css";
import { post } from '../../utilities';
import { navigate } from '@reach/router';



class Post extends Component {
  constructor(props){
    super(props); 
    this.state = {
      subject: '', 
      tag: '', 
      question: ''
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const { subject, tag, question,  } = this.state;
    const writer = this.props.writerId;
    console.log(writer);
    post('/api/post', { subject, tag, question, writer } ).then((res) => {
      console.log('form submitted');
      navigate(`/questions/${res._id}`);
    });
    
  }
  
  render() {
    const { subject, tag, question} = this.state;
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

export default Post;
