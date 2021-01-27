import React, { useState, useEffect } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import LikeDislikes from "./LikeDislikes";
import { get, post } from "../../utilities.js";
import Delete from "./Delete.js";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "react-timeago";

import "../../css/SingleComment.css";

const { TextArea } = Input;

let writerId = null;

//code citation: https://github.com/jaewonhimnae/react-youtube-clone/blob/master/client/src/components/views/DetailVideoPage/Sections/SingleComment.js

function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);
  const [Loading, setLoading] = useState(true);

  get("/api/whoami") //our code
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

  const onSubmit = (e) => {//from source
    e.preventDefault();

    const variables = {
      writer: writerId,
      questionId: props.questionId,
      responseTo: props.comment._id,
      content: CommentValue,
    };

    post("/api/saveComment", variables).then((res) => {//idea from source, modified source's code 
      if (res.success) {
        setCommentValue("");
        setOpenReply(!OpenReply);
        props.refreshFunction(res.result);
      } else {
        console.log("Failed to save Comment");
      }
    });
  };

  // let replyText = null;
  // if (props.displayReplyTo){
  //   replyText = <span onClick={openReply} key="comment-basic-reply-to">Reply to </span> ;
  // }
  const timestamp = new Date(props.comment.createdAt);

  const actions = [ //some idea from source, some ours
    <div className="singleComment__infoContainer">
      <LikeDislikes comment commentId={props.comment._id} userId={writerId} /> 
      {writerId ? (
        <span className="singleComment__reply" onClick={openReply} key="comment-basic-reply-to">
          Reply to{" "}
        </span>
      ) : null}
      <div className="timeAgo">
        <TimeAgo date={timestamp} />
      </div>
    </div>,
  ];

  // if (props.displayReplyTo){
  //   actions.push(<span onClick={openReply} key="comment-basic-reply-to">Reply to </span>);
  // }

  if (Loading) {
    return (
      <div className="loader loader_general">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div>
    );
  } else {
    //in return statement, we borrowed some code from source but had a lot original 
    return (
      <div className="singleComment">
        <Comment
          actions={actions}
          author={
            <a href={`/profile/${props.comment.writer._id}`}>
              {props.comment.writer.username}
            </a>
          }
          content={
            <div className="reactHtmlParser__container">
              {ReactHtmlParser(props.comment.content)}
            </div>
          }
        ></Comment>

        {writerId === props.comment.writer._id ? (
          <Delete
            comment
            commentId={props.comment._id}
            userId={writerId}
            questionId={props.questionId}
          />
        ) : null}
        {OpenReply && (
          <form className="singleComment__form" onSubmit={onSubmit}>
            <input onChange={handleChange} value={CommentValue} placeholder="comments" />
            <button className="btn btn-hoverDarkGreen" onClick={onSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default SingleComment;
