import React, { Component } from "react";
import ReactQuill from "react-quill";
import katex from "katex";
// import "katex/dist/katex.min.css";
window.katex = katex;

import "react-quill/dist/quill.snow.css";

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    // this.formats = formats;
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "code-block", "formula"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  handleChange(value) {
    this.setState({ text: value });
    const text = this.state;
    this.props.stateUp(value);
  }

  render() {
    return (
      <ReactQuill
        name="question"
        value={this.state.text}
        onChange={this.handleChange}
        formats={this.formats}
        modules={this.modules}
      />
    );
  }
}

export default RichTextEditor;
