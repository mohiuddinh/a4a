import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";

import { post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      tag: "",
      question: "",
    };
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

    console.log("Tags");
    console.log(tag);

    console.log("Question");
    console.log(question);

    const writer = this.props.writerId;
    console.log(writer);
    post("/api/post", { subject, tag, question, writer }).then((res) => {
      console.log("form submitted");
      // console.log(res);
      navigate(`/questions/${res._id}`);
    });
  };

  render() {
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
                tags={[]}
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
              <RichTextEditor value={question} stateUp={this.liftStateUp} name="question" />
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
