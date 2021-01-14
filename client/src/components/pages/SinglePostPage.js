import React, { Component, useEffect, useState } from "react";
import { get } from "../../utilities.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "../../css/SinglePostPage.css";

function SinglePostPage(props) {
  const questionId = props.computedMatch.params.questionId;
  const [Question, setQuestion] = useState([]);

  useEffect(() => {
    get(`/api/question_by_id?id=${questionId}&type=single`).then((res) => {
      setQuestion(res[0]);
      console.log(Question);
    });
  }, []);

  return (
    <div className="singlePost">
      <div className="singlePost__container">
        <div className="singlePost__avatar">
          <AccountCircleIcon fontSize="large" />
          <h5>Lorem Ipsum</h5>
          <h5>1/14/21</h5>
          <h5>4:28 pm</h5>
        </div>
        <div className="singlePost__main">
          <div className="singlePost__mainSub">
            <h5>
              <span>Subject: </span>
              {Question.subject}
            </h5>
          </div>
          <div className="singlePost__mainSub">
            <span>Tags: </span>
            {Question.tag}
          </div>
          <div className="singlePost__mainSub">
            <p>
              <span>Questions: </span>
              {Question.question}
            </p>
          </div>
        </div>
      </div>
      <div className="singlePost__container">
        <div className="singlePost__commentContainer">
          <div className="singlePost__avatar">
            <AccountCircleIcon fontSize="large" />
            <h5>Lorem Ipsum</h5>
            <h5>1/14/21</h5>
            <h5>4:28 pm</h5>
          </div>
          <div className="singlePost__comment">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate deserunt vero
              aliquid, tenetur labore modi debitis dolor laudantium natus. Corporis nostrum quas
              architecto laborum laudantium illo perferendis deleniti voluptas praesentium non
              aliquam, qui optio. Tempore quod et, officiis voluptas nemo saepe nesciunt at nulla
              provident maxime dignissimos sapiente, rem sit!
            </p>
            <div className="singlePost__commentSub">
              <input type="text" placeholder="reply" />
              <button className="btn">Send</button>
            </div>
          </div>
        </div>
        <div className="singlePost__commentContainer">
          <div className="singlePost__avatar">
            <AccountCircleIcon fontSize="large" />
            <h5>Lorem Ipsum</h5>
            <h5>1/14/21</h5>
            <h5>4:28 pm</h5>
          </div>
          <div className="singlePost__comment">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate deserunt vero
              aliquid, tenetur labore modi debitis dolor laudantium natus. Corporis nostrum quas
              architecto laborum laudantium illo perferendis deleniti voluptas praesentium non
              aliquam, qui optio. Tempore quod et, officiis voluptas nemo saepe nesciunt at nulla
              provident maxime dignissimos sapiente, rem sit!
            </p>
            <div className="singlePost__commentSub">
              <input type="text" placeholder="reply" />
              <button className="btn">Send</button>
            </div>
          </div>
        </div>
        <div className="singlePost__commentContainer">
          <div className="singlePost__avatar">
            <AccountCircleIcon fontSize="large" />
            <h5>Lorem Ipsum</h5>
            <h5>1/14/21</h5>
            <h5>4:28 pm</h5>
          </div>
          <div className="singlePost__comment">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate deserunt vero
              aliquid, tenetur labore modi debitis dolor laudantium natus. Corporis nostrum quas
              architecto laborum laudantium illo perferendis deleniti voluptas praesentium non
              aliquam, qui optio. Tempore quod et, officiis voluptas nemo saepe nesciunt at nulla
              provident maxime dignissimos sapiente, rem sit!
            </p>
            <div className="singlePost__commentSub">
              <input type="text" placeholder="reply" />
              <button className="btn">Send</button>
            </div>
          </div>
        </div>
      </div>
      <div className="singlePost__container">
        <input type="text" placeholder="comment" />
        <button className="btn">Send</button>
      </div>
    </div>
  );
}

export default SinglePostPage;
