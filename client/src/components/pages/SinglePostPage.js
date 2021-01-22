import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import ReactHtmlParser from "react-html-parser";
import { navigate } from '@reach/router'; 
import ReactTimeAgo from "react-time-ago";
import LikeDislikes from "./LikeDislikes.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "../../css/SinglePostPage.css";
import Comments from "./Comments.js";
import Delete from './Delete.js'; 
import Edit from './Edit.js'; 

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
              {Question.writer.username}
              <h5>
                <span>Subject: </span>
                {Question.subject}
              </h5>
            </div>
            <div className="singlePost__sub">
              <span className="singlePost__tag">Tags: </span>
              <ul id="tags">
                {Question.tag.map((tag) => (
                  <li className="tag">
                    <span className="tag-title">{tag}</span>
                  </li>
                ))}
              </ul>
              {writer === Question.writer._id ? (
                <Delete question questionId={questionId} userId={writer} />
              ) : null}
              {writer === Question.writer._id ? <button onClick={newPage}>Edit</button> : null}
            </div>
            <div>
              Posted at: <ReactTimeAgo date={Question.createdAt} locale="en-US" timeStyle="round" />
            </div>
            <div className="singlePost__sub">
              <span>Question: </span>
              <div className="reactHtmlParser__container">{ReactHtmlParser(Question.question)}</div>
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
