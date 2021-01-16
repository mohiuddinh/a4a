import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from 'axios'; 

import "../../css/SinglePostPage.css";
import Comments from './Comments.js'; 

function SinglePostPage(props) {
  const questionId = props.questionId;
  const [Question, setQuestion] = useState([]);
  const [CommentLists, setCommentLists] = useState([])

  const questionVariable = {
    questionId: questionId
  };

  const writer = props.props; 
  useEffect(() => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      setQuestion(res[0]);
    });

    axios.post('/api/getComments', questionVariable).then((res) => {
      if(res.data.success){
        setCommentLists(res.data.comments)
      } else {
        alert('Failed to load comments')
      }
    })

  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment)); 
  }

  return (
    <div >
      <p>{Question.subject}</p>
      <p>{Question.tag}</p>
      <p>{Question.question}</p>
      <Comments CommentLists={CommentLists} writerId={writer} questionId={questionId} refreshFunction={updateComment}/>
      
      
    </div>
  );
}

export default SinglePostPage;
