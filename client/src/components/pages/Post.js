import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      tag: [],
      question: "",
      loading: true, 
      writer: ""
    };
  }

  componentDidMount() {
    get('/api/whoami').then((res)=>{ 
      this.setState({ loading: false, writer: res.id })
    })
  }

  liftStateUp = (data) => {
    this.setState({ question: data });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { subject, tag, question } = this.state;

    const writer = this.state.writer;
    post("/api/post", { subject, tag, question, writer }).then((res) => {
      console.log("form submitted");
      navigate(`/questions/${res._id}`);
    });
  };

  render() {
    if(this.state.loading){
      return(
        <div>Loading...</div>
      )
    }

    const selectedTags = (tags) => {
      this.setState({ tag: tags }, () => {});
    };

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
              required
            />
            <div className="post__textInput">
              <TagsInput selectedTags={selectedTags} tags={[]} />
            </div>
            <div className="post__richTextEditor">
              <RichTextEditor
                value={question}
                text={this.state.question}
                stateUp={this.liftStateUp}
                name="question"
              />
            </div>
            <div className="post__selection">
              <input type="submit" value="Submit" className="post__btnInput btn" required />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Post;
