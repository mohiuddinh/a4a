import React, { Component } from "react";

import "../../css/Post.css";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="post__container">
          <form>
            <input type="text" name="subject" placeholder="Subject" className="post__textInput" />
            <input type="text" name="tag" placeholder="Tags" className="post__textInput" />
            <textarea
              name="question"
              id="post__questionField"
              cols="30"
              rows="10"
              placeholder="Question"
            ></textarea>
            <div className="post__selection">
              <input type="reset" value="Discard" className="post__btnInput btn" />
              <input type="submit" value="Submit" className="post__btnInput btn" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Post;
