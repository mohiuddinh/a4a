import { navigate } from '@reach/router';
import React, { Component } from "react";
import { get, post } from '../../utilities';
import "../../css/Post.css";


class Edit extends Component {
  constructor(props){
    super(props); 
    this.state={
      subject: '',
      tag: '',
      question: '', 
      loading: true
    }
  }; 
  
  componentDidMount() {
    get(`/api/question_by_id?id=${this.props.questionId}&type=single`).then((res) => {
      this.setState({
        subject: res[0].subject, 
        tag: res[0].tag, 
        question: res[0].question, 
        loading: false
      })
      }) 
    };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }); 
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const { subject, tag, question } = this.state; 
    const _id = this.props.questionId; 
    post('/api/updatePost', { subject, tag, question, _id }).then((res)=>{
      navigate(`/questions/${_id}`); 
    })
  };

  // newPage = () =>{
  //   const _id = this.props.questionId; 
  //   navigate(`/questions/edit/${_id}`).then(()=>{
  //     redirect = true; 
  //   })
  // }

  render() {
    if(this.state.loading){
      return(
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    const { subject, tag, question } = this.state; 
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
              //defaultValue={this.state.subject}
              required
            />
            <input
              type="text"
              name="tag"
              placeholder="Tags"
              className="post__textInput"
              value={tag}
              onChange={this.onChange}
              //defaultValue={this.state.tag}
              required
            />
            <textarea
              name="question"
              id="post__questionField"
              cols="30"
              rows="10"
              placeholder="Question"
              value={question}
              onChange={this.onChange}
              //defaultValue={this.state.question}
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


export default Edit; 