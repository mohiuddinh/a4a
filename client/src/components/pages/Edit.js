import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";
import ReactHtmlParser from 'react-html-parser'; 

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      tag: "",
      question: "",
      loading: true,
    };
  }

  componentDidMount() {
    get(`/api/question_by_id?id=${this.props.questionId}&type=single`).then((res) => {
      this.setState({
        subject: res[0].subject,
        tag: res[0].tag,
        question: res[0].question,
        loading: false,
      });
    });
  }

  liftStateUp = (data) => {
    // console.log("liftStateUp");
    this.setState({ question: data });
    // console.log(this.state.question);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    // console.log(this.state);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { subject, tag, question } = this.state;
    const _id = this.props.questionId;
    post("/api/updatePost", { subject, tag, question, _id }).then((res) => {
      navigate(`/questions/${_id}`);
    });
  };

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    const selectedTags = (tags) => {
      // console.log(tags);
      this.setState({ tag: tags });
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
            {/* <input
              type="text"
              name="tag"
              placeholder="Tags"
              className="post__textInput"
              value={tag}
              onChange={this.onChange}
              required
            /> */}
            <div className="post__textInput">
              <TagsInput
                selectedTags={selectedTags}
                tags={this.state.tag}
                value={tag}
                onChange={this.onChange}
                name="tag"
              />
            </div>
            {/* <textarea
              name="question"
              id="post__questionField"
              cols="30"
              rows="10"
              placeholder="Question"
              value={question}
              onChange={this.onChange}
              required
            ></textarea> */}
            <div className="post__richTextEditor">
              <RichTextEditor value={question} text={this.state.question} stateUp={this.liftStateUp} name="question" />
            </div>
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
