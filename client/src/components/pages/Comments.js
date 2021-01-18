import React, { useState } from "react";
import "../../css/SinglePostPage.css";
import { get, post } from "../../utilities.js";
import SingleComment from "./SingleComment.js";
import ReplyComment from "./ReplyComment.js";
import { Button, Input } from "antd";
const { TextArea } = Input;

const replyTo = true;

function Comments(props) {
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

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

  }
  return (
    <div>
      <br />
      <p> replies</p>
      <hr />
      {/* Comment Lists  */}
      {/* {console.log(props.CommentLists)} */}

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  comment={comment}
                  questionId={props.questionId}
                  refreshFunction={props.refreshFunction}
                  writerId={props.writerId}
                  displayReplyTo={replyTo}
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
  ) 
}

export default Comments;
