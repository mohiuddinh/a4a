import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import Axios from "axios";
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import { get, post } from "../../utilities.js";
import { store } from "react-notifications-component";

import "antd/dist/antd.css";
import "animate.css/animate.min.css";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  // const [Loading, setLoading] = useState(true);

  let variable = {};
  // let userId = null;
  // get('/api/whoami').then((res)=>{
  //     userId = res.id;
  //     setLoading(false);
  // })

  const notification = {
    title: "Error",
    message: "Please login before you comment and like.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
    animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
    dismiss: {
      duration: 2500,
      onScreen: true,
    },
  };

  if (props.question) {
    variable = { questionId: props.questionId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
    //console.log(variable)
  }

  useEffect(() => {
    post("/api/getLikes", variable).then((res) => {
      //console.log('getLikes',response.data)
      //console.log(res);

      if (res.success) {
        //How many likes does this video or comment have
        setLikes(res.likes.length);
        //console.log(props.userId);
        //if I already click this like button or not
        res.likes.map((like) => {
          //console.log(like.userId);
          if (
            like.userId === props.userId &&
            ((props.question && like.questionId === props.questionId) ||
              (props.comment && like.commentId === props.commentId))
          ) {
            //console.log('liked');
            //console.log((like));
            setLikeAction("liked");
          }
        });
      } else {
        console.log("Failed to get likes");
      }
    });

    post("/api/getDislikes", variable).then((res) => {
      //console.log('getDislike',response.data)
      if (res.success) {
        //How many likes does this video or comment have
        setDislikes(res.dislikes.length);

        //if I already click this like button or not
        res.dislikes.map((dislike) => {
          if (
            dislike.userId === props.userId &&
            ((props.question && dislike.questionId === props.questionId) ||
              (props.comment && dislike.commentId === props.commentId))
          ) {
            //console.log("disliked");
            //console.log(dislike);
            setDislikeAction("disliked");
          }
        });
      } else {
        console.log("Failed to get dislikes");
      }
    });
  }, []);

  const onLike = () => {
    console.log(props.userId);
    if (props.userId === undefined || props.userId === null) {
      store.addNotification(notification);
    } else if (LikeAction === null) {
      post("/api/upLike", variable).then((res) => {
        console.log(res);
        if (res.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");
          //console.log("Liked message");
          //console.log(res);

          //If dislike button is already clicked

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          console.log("Failed to increase the like");
        }
      });
    } else {
      post("/api/unLike", variable).then((res) => {
        if (res.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
          //console.log("Unliked message");
        } else {
          //console.log("Failed to decrease the like");
        }
      });
    }
  };

  const onDisLike = () => {
    if (props.userId === undefined || props.userId === null) {
      store.addNotification(notification);
    } else if (DislikeAction !== null) {
      post("/api/unDisLike", variable).then((res) => {
        if (res.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
          console.log("Undisliked message");
        } else {
          console.log("Failed to decrease dislike");
        }
      });
    } else {
      post("/api/upDisLike", variable).then((res) => {
        console.log(res);
        if (res.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          console.log("Disliked Message");

          //If dislike button is already clicked
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          console.log("Failed to increase dislike");
        }
      });
    }
  };

  // if (Loading){
  //   return (
  //     <div>Loading</div>
  //   );
  // };

  return (
    <React.Fragment>
      <div className="likeDislikes">
        <span key="comment-basic-like">
          <Tooltip title="Like">
            {/* <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} /> */}
            {LikeAction === "liked" ? (
              <LikeFilled onClick={onLike} />
            ) : (
              <LikeOutlined onClick={onLike} />
            )}
          </Tooltip>
          <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Likes}</span>
        </span>
        &nbsp;&nbsp;
        <span key="comment-basic-dislike">
          <Tooltip title="Dislike">
            {/* <Icon
                        type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDisLike}
                    /> */}
            {DislikeAction === "disliked" ? (
              <DislikeFilled onClick={onDisLike} />
            ) : (
              <DislikeOutlined onClick={onDisLike} />
            )}
          </Tooltip>
          <span style={{ paddingLeft: "8px", cursor: "auto" }}>{Dislikes}</span>
        </span>
      </div>
    </React.Fragment>
  );
}

export default LikeDislikes;
