import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import ReactHtmlParser from "react-html-parser";
import { navigate, Link } from "@reach/router";
import TimeAgo from "react-timeago";
import LikeDislikes from "./LikeDislikes.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Background from "./Background.js";

import "../../css/SinglePostPage.css";
import Comments from "./Comments.js";
import Delete from "./Delete.js";
import Edit from "./Edit.js";

function SinglePostPage(props) {
  const questionId = props.questionId;
  const [Question, setQuestion] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const questionVariable = {
    questionId: questionId,
  };

  const writer = props.writerId;
  useEffect(() => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      //used online code for this api request: https://github.com/mukeshphulwani66/Instagram-clone-MERN-Stack/blob/master/client/src/components/screens/Profile.js
      setQuestion(res[0]);
    });

    post("/api/getComments", questionVariable).then((res) => {
      if (res.success) {
        setCommentLists(res.comments);
      } else {
        alert("Failed to load comments");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const selectedTags = (tags) => {
    console.log(tags);
  };

  function newPage() {
    navigate(`/questions/edit/${questionId}`).then(() => {
      return (
        <Edit
          questionId={questionId}
          userId={writer}
          subject={Question.subject}
          tag={Question.tag}
          question={Question.question}
        />
      );
    });
  }

  function profileClick() {
    navigate(`/profile/${Question.writer._id}`);
  }

  if (Question.writer) {
    const iconColor = Question.writer.iconColor;
    const timestamp = new Date(Question.createdAt);
    return (
      <div className="singlePost animate__animated animate__fadeIn">
        <Background color={"525252"} />
        <div className="singlePost__largeContainer">
          <div className="singlePost__container">
            <div className="singlePost__profile">
              <div className="singlePost__profileContainer">
                <AccountCircleIcon
                  style={{ color: iconColor }}
                  fontSize="large"
                  onClick={profileClick}
                  className="singlePost__profileIcon"
                />
              </div>
              <div className="singlePost__profileContainer">
                <LikeDislikes question questionId={questionId} userId={writer} />
              </div>
              <div className="singlePost__profileContainer">{Question.writer.username}</div>
              <div className="timeAgo singlePost__profileContainer">
                <TimeAgo date={timestamp} />
              </div>
              <div className="singlePost__userActions">
                {writer === Question.writer._id ? (
                  <Delete question questionId={questionId} userId={writer} />
                ) : null}
                {writer === Question.writer._id ? (
                  <button onClick={newPage} className="btn-userActions btn-slide-edit">
                    Edit
                  </button>
                ) : null}
              </div>
            </div>
            <div className="singlePost__main">
              <div className="singlePost__sub">
                <h5>
                  <span>Subject: </span>
                  {Question.subject}
                </h5>
              </div>
              <div className="singlePost__sub">
                <span className="singlePost__tag">Tags: </span>
                <ul id="tags">
                  {Question.tag.map((tag, index) => (
                    <li
                      className="tag"
                      key={index}
                      style={{ backgroundColor: "#caf4f4", color: "black" }}
                    >
                      <span className="tag-title">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="singlePost__sub">
                <span>Question: </span>
                <div className="reactHtmlParser__container">
                  {ReactHtmlParser(Question.question)}
                </div>
              </div>
            </div>
          </div>
          <div className="singlePost__container">
            <Comments
              CommentLists={CommentLists}
              writerId={writer}
              questionId={questionId}
              refreshFunction={updateComment}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader loader_general">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
      </div>
    );
  }
}

export default SinglePostPage;
