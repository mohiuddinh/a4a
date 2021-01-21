import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import LikeDislikes from "./LikeDislikes.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Delete from './Delete.js'; 
import { navigate } from '@reach/router'; 
import Edit from './Edit.js'; 

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
        //console.log(res);
        setCommentLists(res.comments);
      } else {
        alert("Failed to load comments");
      }
    });
  }, []);

  function newPage () {
    navigate(`/questions/edit/${questionId}`).then(()=>{
      return (
        <Edit questionId={questionId} userId={writer} subject={Question.subject} tag={Question.tag} question={Question.question}/> 
      ) 
    })
  }

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };
  if (Question.writer) {
    return (
      <div className="singlePost">
        <div className="singlePost__container">
          <div className="singlePost__profile">
            <AccountCircleIcon />
          </div>
          <p>{Question.subject}</p>
          <p>{Question.tag}</p>
          <p>{Question.question}</p>
          {console.log(Question.subject)}
          {writer === Question.writer._id ? <Delete question questionId={questionId} userId={writer} /> : null}
          {writer === Question.writer._id ? <button onClick={newPage}>Edit</button> : null}
          
          <LikeDislikes question questionId={questionId} userId={writer} />
        </div>
        <div className="singlePost__container">
          <Comments
            CommentLists={CommentLists}
            writerId={writer}
            questionId={questionId}
            refreshFunction={updateComment}
          />
        </div>
        <div className="singlePost__container"></div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default SinglePostPage;
