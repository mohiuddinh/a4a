import React, { Component, useEffect, useState } from "react";
import { get } from '../../utilities.js'; 


function SinglePostPage(props){
  const questionId = props.questionId; 
  const [Question, setQuestion] = useState([])

  useEffect( () => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      setQuestion(res[0]);
    })
  }, [])

  return(
    <div>
      <p>{Question.subject}</p>
      <i>{Question.tag}</i>
      <p>{Question.question}</p>
    </div>
  )

}
export default SinglePostPage;