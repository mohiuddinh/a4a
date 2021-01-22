import React, { useState, useEffect } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import LikeDislikes from "./LikeDislikes";
import { get, post } from "../../utilities.js";

import "../../css/SingleComment.css";

const { TextArea } = Input;

let writerId = null;

function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const [Loading, setLoading] = useState(true);

  get("/api/whoami")
    .then((res) => {
      writerId = res.id;
    })
    .then(() => {
      setLoading(false);
    });

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: writerId,
      questionId: props.questionId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    post("/api/saveComment", variables).then((res) => {
      if (res.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(res.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  // let replyText = null;
  // if (props.displayReplyTo){
  //   replyText = <span onClick={openReply} key="comment-basic-reply-to">Reply to </span> ;
  // }
  const actions = [
    <LikeDislikes comment commentId={props.comment._id} userId={writerId} />,
    <span className="singleComment__reply" onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  // if (props.displayReplyTo){
  //   actions.push(<span onClick={openReply} key="comment-basic-reply-to">Reply to </span>);
  // }

  if (Loading) {
    console.log("executed loading statement");
    return <div>Loading</div>;
  } else {
    // console.log("executed not loading statement");
    return (
      <div className="singleComment">
        <Comment
          actions={actions}
          author={props.comment.writer.fullName}
          content={
            <div className="reactHtmlParser__container">
              {ReactHtmlParser(props.comment.content)}
            </div>
          }
        ></Comment>

        {OpenReply && (
          <form className="singleComment__form" onSubmit={onSubmit}>
            <input onChange={handleChange} value={CommentValue} placeholder="comments" />
            <button className="btn" onClick={onSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default SingleComment;
