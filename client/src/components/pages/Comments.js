import React, { useState } from "react";
import { Button, Input } from "antd";

import { get, post } from "../../utilities.js";
import SingleComment from "./SingleComment.js";
import ReplyComment from "./ReplyComment.js";
import RichTextEditor from "./RichTextEditor.js";

import "../../css/SinglePostPage.css";
import "../../css/Comments.css";

const { TextArea } = Input;

const replyTo = true;

function Comments(props) {
  const [Comment, setComment] = useState("");

  // const handleChange = (e) => {
  //   setComment(e.currentTarget.value);
  // };

  const liftStateUp = (data) => {
    setComment(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(Comment);

    const variables = {
      content: Comment,
      writer: props.writerId,
      questionId: props.questionId,
    };

    post("/api/saveComment", variables).then((res) => {
      if (res.success) {
        setComment("");
        props.refreshFunction(res.result);
      } else {
        alert("Failed to save comment");
      }
    });
  };
  return (
    <div className="comments">
      <div className="comments__container">
        <h4>Comments</h4>
        {props.CommentLists &&
          props.CommentLists.map(
            (comment, index) =>
              !comment.responseTo && (
                <React.Fragment key={index}>
                  <div className="comments__main">
                    <SingleComment
                      comment={comment}
                      questionId={props.questionId}
                      refreshFunction={props.refreshFunction}
                      writerId={props.writerId}
                      displayReplyTo={replyTo}
                    />

                    <ReplyComment
                      CommentLists={props.CommentLists}
                      questionId={props.questionId}
                      parentCommentId={comment._id}
                      refreshFunction={props.refreshFunction}
                    />
                  </div>
                </React.Fragment>
              )
          )}
      </div>
      {props.writerId ? (
        <div className="comments__container">
          <form onSubmit={onSubmit}>
            <div className="post__richTextEditor">
              <RichTextEditor value={Comment} stateUp={liftStateUp} />
            </div>
            <button className="btn btn-submit" onClick={onSubmit}>
              Submit
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Comments;
