import React, { Component } from "react";
import TagsInput from "./TagsInput.js";
import RichTextEditor from "./RichTextEditor.js";
import ReactHtmlParser from "react-html-parser";

import { get, post } from "../../utilities";
import { navigate } from "@reach/router";

import "../../css/Post.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      description: "",
      username: "",
      iconColor: "",
      major: "",
      occupation: ""
    };
  }

  componentDidMount() {
    get(`/api/profile_by_id/${this.props.id}`).then((res) => {
      console.log(res.user);
      const { description, username, iconColor, major, occupation } = res.user[0];
      this.setState({
        loading: false,
        description: description,
        username: username,
        iconColor: iconColor,
        major: major,
        occupation: occupation
      });
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
              <RichTextEditor
                value={question}
                text={this.state.question}
                stateUp={this.liftStateUp}
                name="question"
              />
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

export default EditProfile;
