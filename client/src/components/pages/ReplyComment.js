import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

import "../../css/ReplyComment.css";

const replyTo = false;

//code citation: https://github.com/jaewonhimnae/react-youtube-clone/blob/master/client/src/components/views/DetailVideoPage/Sections/ReplyComment.js

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.CommentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.CommentLists, props.parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              questionId={props.questionId}
              refreshFunction={props.refreshFunction}
              displayReplyTo={replyTo}
            />
            <ReplyComment
              CommentLists={props.CommentLists}
              parentCommentId={comment._id}
              questionId={props.questionId}
              refreshFunction={props.refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div className="replyComment">
      {ChildCommentNumber > 0 && (
        <span onClick={handleChange}>
          View {ChildCommentNumber} {OpenReplyComments ? <span>less</span> : <span>more</span>}{" "}
          comment(s)
        </span>
      )}

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
