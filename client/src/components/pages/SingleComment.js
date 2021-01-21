import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
import { get, post } from '../../utilities.js'; 
import Delete from './Delete.js'; 
import Edit from './Edit.js'; 

const { TextArea } = Input;

let writerId = null; 

function SingleComment(props) {
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const [Loading, setLoading] = useState(true); 

    
    get('/api/whoami').then((res)=>{
    writerId = res.id; 
    }).then(() => { 
        setLoading(false) 
    }); 

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

import "../../css/SingleComment.css";

const { TextArea } = Input;

let writerId = null;

    if (Loading){
      return (
        <div>Loading</div>
      );
    }
    else {
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.fullName}
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
            {writerId === props.comment.writer._id ? <Delete comment commentId={props.comment._id} userId={writerId} questionId={props.questionId} /> : null}
            {writerId === props.comment.writer._id ? <Edit comment commentId={props.comment._id} userId={writerId} questionId={props.questionId} /> : null}

            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="comments"
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }

        </div>
    )}
}
}

export default SingleComment;
