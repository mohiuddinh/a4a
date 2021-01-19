import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import LikeDislikes from "./LikeDislikes.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "../../css/SinglePostPage.css";
import Comments from "./Comments.js";

function SinglePostPage(props) {
  const questionId = props.questionId;
  const [Question, setQuestion] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const questionVariable = {
    questionId: questionId,
  };

  const writer = props.writerId;
  //console.log(writer);
  useEffect(() => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      setQuestion(res[0]);
    });

    post("/api/getComments", questionVariable).then((res) => {
      if (res.success) {
        console.log(res);
        setCommentLists(res.comments);
      } else {
        alert("Failed to load comments");
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  if (Question.writer) {
    return (
      <div className="singlePost">
        <div className="singlePost__container">
          <div className="singlePost__profile">
            <div className="singlePost__profileContainer">
              <AccountCircleIcon style={{ color: "lightblue" }} fontSize="large" />
            </div>
            <div className="singlePost__profileContainer">
              <LikeDislikes question questionId={questionId} userId={writer} />
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
              <span>Tags: </span>
              {Question.tag}
            </div>
            <div className="singlePost__sub">
              <p>
                <span>Question: </span>
                {Question.question}
              </p>
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
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default SinglePostPage;
