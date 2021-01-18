import React, { Component, useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from 'axios'; 
import LikeDislikes from './LikeDislikes.js'; 

import "../../css/SinglePostPage.css";
import Comments from './Comments.js'; 

function SinglePostPage(props) {
  const questionId = props.questionId;
  const [Question, setQuestion] = useState([]);
  const [CommentLists, setCommentLists] = useState([])

  const questionVariable = {
    questionId: questionId
  };

  const writer = props.writerId; 
  //console.log(writer); 
  useEffect(() => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      setQuestion(res[0]);
    });

    post('/api/getComments', questionVariable).then((res) => {
      if(res.success){
        console.log(res); 
        setCommentLists(res.comments)
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
      <LikeDislikes question questionId={questionId} userId={writer}/>
      <Comments CommentLists={CommentLists} writerId={writer} questionId={questionId} refreshFunction={updateComment}/>
    </div>
  );
}

export default SinglePostPage;
